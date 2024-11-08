import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientForm } from '../../models/clientForm/client-form';
import { OrderService } from '../../services/orderService/order.service';
import { Router } from '@angular/router';
import { AddedOrderDTO } from '../../models/DTOs/requestDTO/addedOrderDTO/added-order-dto';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { CartItemService } from '../../services/cartItemService/cart-item.service';
import { GovernoratesAndCities } from '../../models/citiesAndGovernorates/governorates-and-cities';
import { AppliedCouponDTO } from '../../models/DTOs/requestDTO/appliedCouponDTO/applied-coupon-dto';
import { CartItem } from '../../models/cartItem/cart-item';
import { AccountService } from '../../services/accountService/account.service';
import { CouponService } from '../../services/couponService/coupon.service';
import { AddedOrderDetails } from '../../models/DTOs/requestDTO/addedOrderDTO/addedOrderDTO/added-order-details';

@Component({
  selector: 'app-new-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './new-one.component.html',
  styleUrl: './new-one.component.css',
})
export class NewOneComponent {
  cartItems: CartItem[] = [];
  filteredCities: {
    id: string;
    governorate_id: string;
    city_name_ar: string;
    city_name_en: string;
  }[] = [];
  clientForm!: FormGroup;
  cities = GovernoratesAndCities.cities;
  governorates = GovernoratesAndCities.governorates;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private cartItemService: CartItemService,
    private couponService: CouponService,
    private orderService: OrderService,
    private accountService: AccountService
  ) {
    this.cartItems = this.router.getCurrentNavigation()!.extras.state![
      'cartItems'
    ] as CartItem[];
    this.createForm();
    this.clientForm.controls['governorate'].valueChanges.subscribe(
      (gorvernorate) => {
        let id = this.governorates.find(
          (value) => value.governorate_name_ar == gorvernorate
        );
        this.filteredCities = this.cities.filter(
          (city) => city.governorate_id === id?.id
        );
      }
    );
  }
  onSubmit() {
    let clientForm: ClientForm = {
      firstMobileNumber: this.clientForm.value.firstMobileNumber,
      secondMobileNumber: this.clientForm.value.secondMobileNumber,
      country: this.clientForm.value.country,
      firstName: this.clientForm.value.firstName,
      lastName: this.clientForm.value.lastName,
      address: this.clientForm.value.address,
      appartment: this.clientForm.value.appartment,
      city: this.clientForm.value.city,
      governorate: this.clientForm.value.governorate,
      postalCode: this.clientForm.value.postalCode,
    };
    let addedOrderDetailsDTO: AddedOrderDetails[] = [];
    this.cartItems.forEach((cartItem) => {
      let addedOrderDetailDTO: AddedOrderDetails = {
        productId: cartItem.productId,
        quantity: cartItem.quantity,
        size: cartItem.size,
      };
      addedOrderDetailsDTO.push(addedOrderDetailDTO);
    });
    let addedOrderDTO: AddedOrderDTO = {
      clientForm: clientForm,
      coupon: this.clientForm.controls['coupon'].value,
      gmail: this.accountService.getUserId()!,
      addedOrderDetailsDTO: addedOrderDetailsDTO,
    };
    this.orderService.addOrder(addedOrderDTO).subscribe({
      next: (data) => {
        this.cartItemService.cartDeleted.next(true);
        this.cartItems = [];
        this.router.navigate(['/']);
      },
      error: (error) => {},
    });
  }
  createForm() {
    this.clientForm = this.fb.group({
      firstMobileNumber: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{10,15}$'), // Assuming mobile number is between 10-15 digits
        ],
      ],
      secondMobileNumber: [
        '',
        [
          Validators.pattern('^[0-9]{10,15}$'), // Optional but should follow the same pattern as the first
        ],
      ],
      country: ['', [Validators.required]],
      firstName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      lastName: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      address: [
        '',
        [
          Validators.required,
          Validators.minLength(5),
          Validators.maxLength(100),
        ],
      ],
      appartment: [
        '',
        [
          Validators.maxLength(10), // Appartment number may not need to be long
        ],
      ],
      city: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      governorate: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(50),
        ],
      ],
      postalCode: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]{5,10}$'), // Assuming postal code can be 5-10 digits
        ],
      ],
      coupon: [null],
    });
  }
  applyCoupon(serialNumber: string) {
    if (this.accountService.getUserId() != null) {
      let appliedCouponDTO: AppliedCouponDTO = {
        cartItems: this.cartItems,
        serialNumber: serialNumber,
        userGmail: this.accountService.getUserId()!,
      };
      this.couponService.applyCoupon(appliedCouponDTO).subscribe({
        next: (res) => {
          this.clientForm.controls['coupon'].setValue(res.entity);
        },
      });
    } else {
      HandleResponse.handleError('invalid user');
    }
  }
  disableCoupon() {
    this.clientForm.controls['coupon'].setValue(null);
    HandleResponse.handleSuccess('coupon disabled');
  }
}
