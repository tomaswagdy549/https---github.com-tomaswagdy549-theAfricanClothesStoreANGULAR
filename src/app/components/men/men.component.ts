import {
  Component,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { Product } from '../../models/product/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductFilterComponent,
    ProductDetailsComponent,
  ],
  templateUrl: './men.component.html',
  styleUrl: './men.component.css',
})
export class MenComponent implements OnInit {
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number[] = [];
  products: Product[] = [];
  sentProduct!: Product;
  selectedProductId: number = 0;
  @ViewChild('container', { read: ViewContainerRef }) entry: ViewContainerRef;
  productDetailsComponent!: ComponentRef<ProductDetailsComponent>;
  constructor(
    private resolver: ViewContainerRef,
    private activatedRoute: ActivatedRoute
  ) {
    this.entry = resolver;
  }

  ngOnInit(): void {
    console.log(this.activatedRoute.snapshot.data['products']);
    this.products = this.activatedRoute.snapshot.data['products'].entities;
    this.totalPages = Array.from({
      length: Math.ceil(this.products.length / this.pageSize),
    });
    this.productDetailsComponent = this.entry.createComponent(
      ProductDetailsComponent
    );
    this.selectedProductId = this.products[0].id;
    this.productDetailsComponent.setInput('productId', this.selectedProductId);
  }
  moveToPage(pageSize: number, Page: number) {
    this.entry.clear();
  }

  currentImage: { [key: number]: string } = {};

  changeImage(cardId: number, hoverImg: string) {
    this.currentImage[cardId] = hoverImg;
  }

  resetImage(cardId: number, defaultImg: string) {
    this.currentImage[cardId] = defaultImg;
  }
}
