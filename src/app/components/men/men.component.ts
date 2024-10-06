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
import { ProductsService } from '../../services/productsService/products.service';

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
  currentPage: number = 1;
  searchFilterQuery: string = '';
  totalPages: number[] = [];
  products: Product[] = [];
  sentProduct!: Product;
  selectedProductId: number = 1;
  constructor(
    private activatedRoute: ActivatedRoute,
    private productService: ProductsService
  ) {
    this.products = this.activatedRoute.snapshot.data['products'].entities;
    this.selectedProductId = this.products[0].id
  }

  ngOnInit(): void {
    for (let i = 1; i <= this.activatedRoute.snapshot.data['products'].totalPages; i++) {
      this.totalPages.push(i);
    }    
    this.searchFilterQuery = this.products[0].gender;
    this.totalPages = Array.from({
      length: Math.ceil(this.products.length / 6),
    });   

  }
  moveToPage(currentPage: number) {
    this.productService
      .filterProducts(
        `gender=${this.searchFilterQuery}&pageNumber=${currentPage}`
      )
      .subscribe({
        next: (response) => {
          this.products = response.entities;
          this.currentPage = response.currentPage
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }

  currentImage: { [key: number]: string } = {};

  changeImage(cardId: number, hoverImg: string) {
    this.currentImage[cardId] = hoverImg;
  }

  resetImage(cardId: number, defaultImg: string) {
    this.currentImage[cardId] = defaultImg;
  }
}
