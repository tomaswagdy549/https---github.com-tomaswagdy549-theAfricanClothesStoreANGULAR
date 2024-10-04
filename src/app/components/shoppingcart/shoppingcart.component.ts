import { Component } from '@angular/core';

@Component({
  selector: 'app-shoppingcart',
  standalone: true,
  imports: [],
  templateUrl: './shoppingcart.component.html',
  styleUrl: './shoppingcart.component.css'
})
export class ShoppingcartComponent {
  quantity: number = 0; // Default quantity

  increment() {
    this.quantity++;
  }

  decrement() {
    if (this.quantity > 0) {
      this.quantity--;
    }
  }
}
