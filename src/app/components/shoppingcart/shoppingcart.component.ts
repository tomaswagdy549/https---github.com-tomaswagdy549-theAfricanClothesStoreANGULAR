import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CartItem } from '../../models/cartItem/cart-item';
import { CartItemService } from '../../services/cartItemService/cart-item.service';
import { FormsModule } from '@angular/forms';
import { ProductPhotoService } from '../../services/productPhotoService/product-photo.service';
import { ProductPhoto } from '../../models/productPhoto/product-photo';
import { CommonModule } from '@angular/common';
import { UpdatedCartItemDTO } from '../../models/DTOs/requestDTO/updatedCartItemDTO/updated-cart-item-dto';

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
    this.quantity = this.cartItem.quantity;
    this.getCartItemPhotos(this.cartItem.productId)
    this.cartItemService.cartItemSelected.subscribe((cartItem)=>{
      this.cartItem = cartItem;
      this.quantity = cartItem.quantity;
      this.getCartItemPhotos(this.cartItem.productId);
    })
  }
  getCartItemPhotos(productId: number) {
    this.productPhotoService
      .getPhotoProductByProductId(productId)
      .subscribe({
        next: (data) => {
          this.productPhotos = data;
        },
        error: (error) => {
          console.error(error);
        },
      });
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
    let updatedCartItem: UpdatedCartItemDTO = {
      applicationUserId: this.cartItem.applicationUserId,
      productId: this.cartItem.productId,
      quantity: this.quantity,
      size: this.cartItem.size,
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
