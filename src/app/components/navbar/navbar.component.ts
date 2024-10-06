import {
  Component,
  ComponentRef,
  ViewContainerRef,
  ViewChild,
} from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AccountService } from '../../services/accountService/account.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LoginComponent, CommonModule, CartComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  @ViewChild('cart', { read: ViewContainerRef }) cartEntry: ViewContainerRef;
  @ViewChild('login', { read: ViewContainerRef }) loginEntry: ViewContainerRef;
  cartComponent!: ComponentRef<CartComponent>;
  loginComponent!: ComponentRef<LoginComponent>;
  numberOfCartItems: number = 0;
  logged: boolean = false;
  sendCartId(): string | null {
    if (this.accountService.getCartId() != null) {
      return this.accountService.getCartId();
    }
    return null;
  }
  constructor(
    private accountService: AccountService,
    private resolver: ViewContainerRef
  ) {
    this.cartEntry = this.resolver;
    this.loginEntry = this.resolver;
    this.accountService.isLogged.subscribe({
      next: (value) => {
        this.logged = value;
        if (value) {
          this.createCartComponent();
          this.destroyLoginComponent();
        } else {
          this.createLoginComponent();
          this.destroyCartComponent();
        }
      },
    });
  }
  logOut() {
    this.accountService.logOut();
  }
  private createCartComponent() {
    this.cartComponent = this.cartEntry.createComponent(CartComponent);
    this.cartComponent.setInput('cartId', this.accountService.getCartId());
    this.cartComponent.instance.numberOfCartItems.subscribe(
      (numberOfItems: number) => {
        this.numberOfCartItems = numberOfItems;
      }
    );
  }
  private destroyCartComponent() {
    if (this.cartComponent) {
      this.cartComponent.destroy();
    }
  }
  private createLoginComponent() {
    this.loginComponent = this.cartEntry.createComponent(LoginComponent);
  }
  private destroyLoginComponent() {
    if (this.loginComponent) {
      this.loginComponent.destroy();
    }
  }
}
