import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem/cart-item';
import { CartItemService } from '../../services/cartItemService/cart-item.service';
import { FormsModule } from '@angular/forms';
import { ProductPhotoService } from '../../services/productPhotoService/product-photo.service';
import { ProductPhoto } from '../../models/productPhoto/product-photo';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css',
})
export class ShoppingcartComponent {
  quantity: number = 0; // Default quantity
  cartItem!: CartItem;
  productPhotos: ProductPhoto[] = [];
  constructor(
    private router: Router,
    private cartItemService: CartItemService,
    private productPhotoService: ProductPhotoService
  ) {
    this.cartItem =
      this.router.getCurrentNavigation()!.extras.state!['cartItem'];
    this.productPhotoService
      .getPhotoProductByProductId(this.cartItem.productId)
      .subscribe({
        next: (data) => {
          this.productPhotos = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
    this.quantity = this.cartItem.quantity;
  }
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
    this.cartItemService.editCartItem(updatedCartItem).subscribe({
      next: (response) => {
        this.cartItemService.cartItemEdited.next(response.entity);
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
