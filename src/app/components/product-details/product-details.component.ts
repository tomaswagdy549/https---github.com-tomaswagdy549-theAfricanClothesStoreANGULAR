import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../models/product/product';
import { ProductPhoto } from '../../models/productPhoto/product-photo';
import { SignalRService } from '../../services/signalRService/signal-r.service';
import { CartItemService } from '../../services/cartItemService/cart-item.service';
import { AccountService } from '../../services/accountService/account.service';
import { AddedCartItemDTO } from '../../models/DTOs/requestDTO/addedCartItemDTO/added-cart-item-dto';
import { ProductsService } from '../../services/productsService/products.service';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from "../login/login.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, FormsModule, LoginComponent],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnChanges, OnDestroy {
  @Input() productId: number = 1;
  product!: Product;
  selectedSize: string = ''
  quantity: number = 0;
  requiredQuantity: number = 0;
  productPhotos: ProductPhoto[] = [];
  constructor(
    private productsService: ProductsService,
    private signalRService: SignalRService,
    private cartItemService: CartItemService,
    private accountService: AccountService
  ) {
    this.signalRService.startConnection().then(() => {
      this.signalRService.addReceiveMessageListener(() => {});
      this.signalRService.joinGroup(`product${this.productId}`);
    });
  }
  ngOnDestroy(): void {
    this.signalRService.leaveGroup(`product${this.productId}`).then(() => {
      this.signalRService.disconnect();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'].currentValue != undefined) {
      if (
        changes['productId'].currentValue != changes['productId'].previousValue
      ) {
        this.signalRService
          .leaveGroup(`product${changes['productId'].previousValue}`)
          .then(() => {});
        this.signalRService
          .joinGroup(`product${changes['productId'].currentValue}`)
          .then(() => {});
      }
    } else {
      this.productId = 1;
    }
    this.productsService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.product = product;
        console.log(product)
        this.selectedSize = this.product.productAvailableSizes[0].availabeSize;
        this.quantity = this.product.productAvailableSizes[0].quantity;
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  addToCart(productId: number) {
    let cartItem: AddedCartItemDTO = {
      gmail: this.accountService.getCartId()!,
      productId: productId,
      size: this.selectedSize,
      quantity: this.requiredQuantity,
    };
    this.cartItemService.addToCart(cartItem).subscribe({
      next: (response) => {
        this.cartItemService.cartItemAdded.next(response.entity)
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  userIsLogged(): boolean {
    return this.accountService.isLogged.getValue();
  }
  getTime(value: Date) {
    const egyptDate = new Date(value).toLocaleString('en-EG', {
      timeZone: 'Africa/Cairo',
    });
    return egyptDate
  }

}
