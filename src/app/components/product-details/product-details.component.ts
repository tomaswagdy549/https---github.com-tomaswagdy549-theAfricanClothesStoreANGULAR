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
import { ProductsService } from '../../services/productsService/products.service';
import { CartItem } from '../../models/cartItem/cart-item';
import { CartItemService } from '../../services/cartItemService/cart-item.service';
import { finalize } from 'rxjs';
import { GlobalDataService } from '../../services/globalService/global-data.service';
import { AccountService } from '../../services/accountService/account.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnChanges, OnDestroy {
  @Input() productId!: number;
  product!: Product;
  selectedSize: string = '';
  quantity: number = 0;
  requiredQuantity: number = 0;
  productPhotos: ProductPhoto[] = [];
  constructor(
    private productsService: ProductsService,
    private signalRService: SignalRService,
    private cartItemService: CartItemService,
    private globalDataService: GlobalDataService,
    private accountService: AccountService,
  ) {
    console.log('component created');
    this.signalRService.startConnection().then(() => {
      this.signalRService.addReceiveMessageListener(() => {});
      this.signalRService.joinGroup(`product${this.productId}`);
    });
  }
  ngOnDestroy(): void {
    console.log('component destroyed');
    this.signalRService.leaveGroup(`product${this.productId}`).then(() => {
      this.signalRService.disconnect();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['productId'].previousValue != undefined)
      if (
        changes['productId'].currentValue !=
        changes['productId'].previousValue.id
      ) {
        this.signalRService
          .leaveGroup(`product${changes['productId'].previousValue}`)
          .then(() => {});
        this.signalRService
          .joinGroup(`product${changes['productId'].currentValue}`)
          .then(() => {});
        console.log(changes);
      }
    this.productId = changes['productId'].currentValue;
    this.productsService.getProduct(this.productId).subscribe({
      next: (response) => {
        this.product = response;
        this.selectedSize = this.product.productAvailableSizes[0].availabeSize;
        this.quantity = this.product.productAvailableSizes[0].quantity;
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  addToCart(productId: number) {
    let cartItem: CartItem = {
      cartId: this.accountService.getCartId(),
      productId: productId,
      size: this.selectedSize,
      quantity: this.requiredQuantity,
    };
    this.globalDataService.apiCallSubject.next(true);
    this.cartItemService
      .addToCart(cartItem)
      .pipe(
        finalize(() => {
          this.globalDataService.apiCallSubject.next(false);
        })
      )
      .subscribe({
        next: (response) => {
          console.log(response);
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
}
