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
import { LoadingSpinnerComponent } from "../loadingSpinner/loading-spinner/loading-spinner.component";

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule, LoadingSpinnerComponent],
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
  callingApi: boolean = false;
  constructor(
    private ProductsService: ProductsService,
    private signalRService: SignalRService,
    private cartItemService: CartItemService
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
          console.log(changes)
      }
    this.productId = changes['productId'].currentValue;
    this.ProductsService.getProduct(this.productId).subscribe({
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
      cartId: '1eab183e-ed20-4682-8261-fe37d6a4aa79',
      productId: productId,
      size: this.selectedSize,
      quantity: this.requiredQuantity,
    };
    this.callingApi = true
    this.cartItemService.addToCart(cartItem).pipe(finalize(()=>{
      this.callingApi = false
    })).subscribe({
      next: (response) => {
        console.log(response)
      },
      error: (err) => {
        console.log(err)
      },
      
    });
  }
}
