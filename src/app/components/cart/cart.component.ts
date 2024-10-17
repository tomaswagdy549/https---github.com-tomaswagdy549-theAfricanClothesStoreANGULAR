import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { CartItemService } from '../../services/cartItemService/cart-item.service';
import { CartItem } from '../../models/cartItem/cart-item';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrl: './cart.component.css',
})
export class CartComponent implements OnChanges {
  @Input() cartId: string | null = null;
  @Output() numberOfCartItems = new EventEmitter<number>();
  public cartItems: CartItem[] = [];
  constructor(private cartItemService: CartItemService, public router: Router) {
    this.cartItemService.cartItemAdded.subscribe((value) => {
      this.cartItems.push(value);
      this.numberOfCartItems.emit(this.cartItems.length);
    });
    this.cartItemService.cartItemEdited.subscribe((value) => {
      this.cartItems.map((item) => {
        if (
          item.cartId == value.cartId &&
          item.productId == value.productId &&
          item.size == value.size
        ) {
          item.quantity = value.quantity;
        }
      });
    });
    this.cartItemService.cartDeleted.subscribe((value) => {
      if (value) {
        this.cartItems = [];
        this.numberOfCartItems.emit(this.cartItems.length);
      }
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['cartId'].currentValue != null) {
      this.cartItemService.getCartItemsByCartId(this.cartId!).subscribe({
        next: (data) => {
          this.cartItems = data;
          this.numberOfCartItems.emit(data.length);
        },
        error: (error) => console.error(error),
      });
    }
  }
  removeFromCart(CartItem: CartItem, index: number) {
    this.cartItemService.removeFromCart(CartItem).subscribe({
      next: (data) => {
        this.cartItems.splice(index, 1);
        this.numberOfCartItems.emit(this.cartItems.length);
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
  }
  routeToShoppingCart(cartItem: CartItem) {
    document.getElementById('close')?.click();
    this.cartItemService.cartItemSelected.next(cartItem)
    this.router.navigateByUrl('/shoppingcart', { state: { cartItem } });
  }
  routeToOrder() {
    document.getElementById('closerButton')?.click();
    this.router.navigate(['/order'], { state: { cartItems: this.cartItems } });
  }
}
