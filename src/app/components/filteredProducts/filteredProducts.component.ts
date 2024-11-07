import { Component, OnInit } from '@angular/core';
import { Product } from '../../models/product/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { ActivatedRoute, Router } from '@angular/router';
import { ProductsService } from '../../services/productsService/products.service';
import { AccountService } from '../../services/accountService/account.service';
import { HandleResponse } from '../../handlingResponse/handle-response';

@Component({
  selector: 'app-men',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductFilterComponent,
    ProductDetailsComponent,
  ],
  templateUrl: './filteredProducts.component.html',
  styleUrl: './filteredProducts.component.css',
})
export class filteredProductsComponent {
  async deleteProduct(productId: number) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to Delete this product ?'
    );
    if (confirmed) {
      this.productService.deleteProduct(productId).subscribe({
        next: (response) => {
          this.products.map((product) => {
            if (product.id === productId) {
              this.products.splice(this.products.indexOf(product), 1);
            }
          });
        },
      });
    }
  }
  currentPage: number = 1;
  searchFilterQuery: string = '';
  totalPages: number[] = [];
  pageSize: number = 6;
  products: Product[] = [];
  sentProduct!: Product;
  selectedProductId!: number;
  constructor(
    private productService: ProductsService,
    private accountService: AccountService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ) {
    this.activatedRoute.paramMap.subscribe((param) => {
      this.searchFilterQuery = param.get('searchQuery')!;
      productService
        .filterProducts(
          this.searchFilterQuery +
            `&pageNumber=${this.currentPage}&pageSize=${this.pageSize}`
        )
        .subscribe((response) => {
          if (response == null) {
            this.router.navigateByUrl('/not-found');
          } else {
            this.products = response.entities;
            this.currentPage = response.currentPage;
            this.selectedProductId = this.products[0].id;
            this.getPages(response.totalPages);
          }
        });
    });
  }
  getPages(totalPages: number) {
    this.totalPages = [];
    for (let i = 1; i <= totalPages; i++) {
      this.totalPages.push(i);
    }
  }
  moveToPage(currentPage: number) {
    this.productService
      .filterProducts(
        `${this.searchFilterQuery}&pageNumber=${currentPage}&pageSize=6`
      )
      .subscribe({
        next: (response) => {
          this.products = response.entities;
          this.currentPage = response.currentPage;
          window.scrollTo({ top: 0, behavior: 'smooth' });
        },
        error: (error) => {
          console.log(error);
        },
      });
  }
  isAdmin(): boolean {
    return this.accountService.isAdmin();
  }
}
