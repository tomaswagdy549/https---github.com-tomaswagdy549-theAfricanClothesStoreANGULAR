import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem/cart-item';
import { AddedOrderDTO } from '../../models/DTOs/requestDTO/addedOrderDTO/added-order-dto';
import { AddedOrderDetails } from '../../models/DTOs/requestDTO/addedOrderDTO/addedOrderDTO/added-order-details';
import { AccountService } from '../../services/accountService/account.service';
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
      total += cartItem.product.currentPrice * cartItem.quantity;
    });
    return total;
  }
  addedOrderDTO: AddedOrderDTO = new AddedOrderDTO();
  cartItems: CartItem[] = [];
  constructor(private router: Router) {
    this.cartItems = this.router.getCurrentNavigation()!.extras.state![
      'cartItems'
    ] as CartItem[];
  }
  async addOrder() {
    const confirmed = await HandleResponse.operationConfirmed(
      'sure you want to purschase the order ?'
    );
    if (confirmed) {
      this.router.navigateByUrl('/new-component', {
        // state: { addedOrderDTO: this.addedOrderDTO, cartItems: this.cartItems },
        state: { cartItems: this.cartItems },
      });
    }
  }
}
