import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem/cart-item';
import { CartItemService } from '../../services/cartItemService/cart-item.service';
import { finalize } from 'rxjs';
import { GlobalDataService } from '../../services/globalService/global-data.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css',
})
export class ShoppingcartComponent implements OnInit {
  quantity: number = 0; // Default quantity
  cartItem!: CartItem;
  constructor(
    private router: Router,
    private cartItemService: CartItemService,
    private globalDataService: GlobalDataService
  ) {
    this.cartItem =
      this.router.getCurrentNavigation()!.extras.state!['cartItem'];
    this.quantity = this.cartItem.quantity;
  }
  ngOnInit(): void {}
  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.cartItem.quantity > 0) {
      this.quantity--;
    }
  }
  editCartItem() {
    let updatedCartItem: CartItem = {
      cartId: this.cartItem.cartId,
      productId: this.cartItem.productId,
      quantity: this.quantity,
      size: this.cartItem.size,
      product: this.cartItem.product,
    };
    // this.globalDataService.apiCallSubject.next(true);
    this.cartItemService.editCartItem(updatedCartItem).subscribe({
      next: (data) => {
        // this.globalDataService.apiCallSubject.next(false);
      },
      error: (error) => {
        // this.globalDataService.apiCallSubject.next(false);
        console.error(error);
      },
    });
  }
}
