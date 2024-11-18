import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CouponService } from '../../services/couponService/coupon.service';
import { AddedCouponDTO } from '../../models/DTOs/requestDTO/addedCouponDTO/added-coupon-dto';
import { HandleResponse } from '../../handlingResponse/handle-response';

@Component({
  selector: 'app-add-coupon',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-coupon.component.html',
  styleUrl: './add-coupon.component.css',
})
export class AddCouponComponent {
  constructor(private couponService: CouponService) {}
  addCoupon() {
    let string =
      this.couponForm.controls['discountExpirationDate'].value?.toString();
    const dateObject = new Date(string!);
    const currentDate = new Date();
    const diffInHours = Math.ceil(
      Math.abs(dateObject.getTime() - currentDate.getTime()) / (1000 * 60 * 60)
    );

    let addedCouponDTO: AddedCouponDTO = {
      serialNumber: this.couponForm.controls['serialNumber'].value!,
      minimumTotalOrderPrice:
        this.couponForm.controls['minimumTotalOrder'].value!,
      discountPercentage:
        this.couponForm.controls['discountPercentage'].value! * 0.01,
      durationOfCouponInHours: diffInHours,
    };
    this.couponService.addCoupon(addedCouponDTO).subscribe({
      next: (response) => {
        console.log(response);
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  couponForm = new FormGroup({
    discountPercentage: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
    ]),
    discountExpirationDate: new FormControl<Date | null>(null, [
      Validators.required,
      this.futureDateValidator,
    ]),
    serialNumber: new FormControl<string>('', [Validators.required]),
    minimumTotalOrder: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
  });
  futureDateValidator(control: FormControl): ValidationErrors | null {
    const selectedDate = new Date(control.value as string);
    const now = new Date();

    // Check if selected date is in the past
    return selectedDate > now ? null : { futureDate: true };
  }
}
