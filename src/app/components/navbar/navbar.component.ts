import {
  Component,
  ComponentRef,
  ViewContainerRef,
  ViewChild,
  OnInit,
} from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AccountService } from '../../services/accountService/account.service';
import { CommonModule } from '@angular/common';
import { CartComponent } from '../cart/cart.component';
import { CategoryService } from '../../services/categoryService/category.service';
import { Category } from '../../models/category/category';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LoginComponent, CommonModule, CartComponent],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  menCategories: Category[] = [];
  womenCategories: Category[] = [];
  accessories: Category[]=[];
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
    categoryService: CategoryService,
    private router: Router,
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
    categoryService.getAllCategories(50, 1).subscribe({
      next: (response) => {
        response.categories.map((category) => {
          if (category.gender == 'Men') {
            this.menCategories.push(category);
          } else if (category.gender == 'Woman') {
            this.womenCategories.push(category);
          } else if (category.gender == 'Both'){
            this.accessories.push(category)
          }
        });
      },
      error: (error) => {
        console.log(error);
      },
    });
  }

  ngOnInit(): void {}
  ifUserIsAdmin(): boolean {
    return this.accountService.isAdmin();
  }
  logOut() {
    this.accountService.logOut();
  }
  goToOnSaleProducts(categories: Category[]) {
    let querySearch = '';
    categories.map((category) => {
      querySearch += `categoryIds=${category.id}&`;
    });
    this.router.navigateByUrl(`/filteredProducts/${querySearch}onSale=true`);
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
