import { CommonModule } from '@angular/common';
import {
  Component,
  Input,
  OnChanges,
  OnDestroy,
  SimpleChanges,
} from '@angular/core';
import { Product } from '../../models/product/product';
import { ProductPhotoService } from '../../services/productPhotoService/product-photo.service';
import { ProductPhoto } from '../../models/productPhoto/product-photo';
import { CategoryService } from '../../services/categoryService/category.service';
import { BrandsService } from '../../services/brandsService/brands.service';
import { SignalRService } from '../../services/signalRService/signal-r.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnChanges, OnDestroy {
  @Input() product!: Product;
  productPhotos: ProductPhoto[] = [];
  private messageSubscription!: Subscription | null;
  constructor(
    private productPhotoService: ProductPhotoService,
    private categoryService: CategoryService,
    private brandService: BrandsService,
    private signalRService: SignalRService
  ) {
    console.log('component created');
    this.signalRService.startConnection().then(() => {
      this.signalRService.addReceiveMessageListener(() => {});
      this.signalRService.joinGroup(`product${this.product.id}`);
    });
  }
  ngOnDestroy(): void {
    console.log('component destroyed');
    this.signalRService.leaveGroup(`product${this.product.id}`).then(() => {
      this.signalRService.disconnect();
    });
  }
  ngOnChanges(changes: SimpleChanges): void {
    if (changes['product'].previousValue != undefined)
      if (
        changes['product'].currentValue != changes['product'].previousValue.id
      ) {
        this.signalRService
          .leaveGroup(`product${changes['product'].previousValue.id}`)
          .then(() => {});
        this.signalRService
          .joinGroup(`product${changes['product'].currentValue.id}`)
          .then(() => {});
      }
    this.product = changes['product'].currentValue;
    this.getProductPhotos(this.product.id);
    this.getCategory(this.product.categoryId);
    this.getBrand(this.product.brandId);
  }
  getCategory(categoryId: number) {
    this.categoryService.getCategoryById(categoryId).subscribe({
      next: (response) => {
        this.product.category = response;
      },
      error: (error) => {},
    });
  }
  getBrand(brandId: number) {
    this.brandService.getBrandById(brandId).subscribe({
      next: (response) => {
        this.product.brand = response;
      },
      error: (error) => {},
    });
  }
  getProductPhotos(productId: number) {
    this.productPhotoService.getPhotoProductByProductId(productId).subscribe({
      next: (response) => {
        this.productPhotos = response.photos;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
}
