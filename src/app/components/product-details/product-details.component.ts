import { CommonModule } from '@angular/common';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { Product } from '../../models/product/product';
import { ProductPhotoService } from '../../services/productPhotoService/product-photo.service';
import { ProductPhoto } from '../../models/productPhoto/product-photo';
import { CategoryService } from '../../services/categoryService/category.service';
import { BrandsService } from '../../services/brandsService/brands.service';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css',
})
export class ProductDetailsComponent implements OnChanges {
  @Input() product!: Product;
  productPhotos: ProductPhoto[] = [];
  constructor(
    private productPhotoService: ProductPhotoService,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) {}
  ngOnChanges(changes: SimpleChanges): void {
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
