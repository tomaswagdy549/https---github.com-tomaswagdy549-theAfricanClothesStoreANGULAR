import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem/cart-item';
import { AddedOrderDTO } from '../../models/DTOs/requestDTO/addedOrderDTO/added-order-dto';
import { AddedOrderDetails } from '../../models/DTOs/requestDTO/addedOrderDTO/addedOrderDTO/added-order-details';
import { AccountService } from '../../services/accountService/account.service';
import { OrderService } from '../../services/orderService/order.service';
import { HandleResponse } from '../../handlingResponse/handle-response';

@Component({
  selector: 'app-order',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './order.component.html',
  styleUrl: './order.component.css',
})
export class OrderComponent {
  getTotalPrice() {
    let total = 0;
    this.cartItems.forEach((cartItem) => {
      total += cartItem.product.price * cartItem.quantity;
    });
    return total;
  }
  addedOrderDTO: AddedOrderDTO = new AddedOrderDTO();
  cartItems: CartItem[] = [];
  constructor(
    private router: Router,
    private accountService: AccountService,
    private orderService: OrderService
  ) {
    this.cartItems = this.router.getCurrentNavigation()!.extras.state![
      'cartItems'
    ] as CartItem[];
    this.addedOrderDTO.applicationUserId = this.accountService.getUserId()!;
    this.cartItems.forEach((item) => {
      let addedOrderDetails: AddedOrderDetails = {
        productId: item.productId,
        quantity: item.quantity,
        size: item.size,
      };
      this.addedOrderDTO.addedOrderDetailsDTO.push(addedOrderDetails);
    });
  }
  addOrder() {
    this.addedOrderDTO.addedOrderDetailsDTO = this.addedOrderDTO.addedOrderDetailsDTO.splice(0,2)
    this.orderService.addOrder(this.addedOrderDTO).subscribe({
      next: (data) => {
        HandleResponse.handleSuccess(data.message)
      },
      error: (error) => {
        HandleResponse.handleError(error.message)
      },
    });
  }

}
