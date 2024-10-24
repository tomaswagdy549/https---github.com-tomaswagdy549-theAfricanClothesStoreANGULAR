import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ClientForm } from '../../models/clientForm/client-form';
import { OrderService } from '../../services/orderService/order.service';
import { Router } from '@angular/router';
import { AddedOrderDTO } from '../../models/DTOs/requestDTO/addedOrderDTO/added-order-dto';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { CartItemService } from '../../services/cartItemService/cart-item.service';

@Component({
  selector: 'app-new-one',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './new-one.component.html',
  styleUrl: './new-one.component.css',
})
export class NewOneComponent {
  addedOrderDTO: AddedOrderDTO;
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
    this.addedOrderDTO.clientForm=clientForm
      this.orderService.addOrder(this.addedOrderDTO).subscribe({
        next: (data) => {
          HandleResponse.handleSuccess(data.message);
          this.cartItemService.cartDeleted.next(true);
        },
        error: (error) => {
          HandleResponse.handleError(error.message);
        },
      });
    }
  clientForm!: FormGroup;

  constructor(private fb: FormBuilder,private router :Router,private cartItemService:CartItemService,private orderService:OrderService) {
    this.addedOrderDTO = this.router.getCurrentNavigation()!.extras.state![
      'addedOrderDTO'
    ] as AddedOrderDTO;
    this.createForm()
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
    });
  }
}
