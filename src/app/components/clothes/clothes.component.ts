import { Component } from '@angular/core';
import { ProductsService } from '../../services/productsService/products.service';
import { Product } from '../../models/product/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { GetAllProductsDTO } from '../../models/DTOs/responseDTO/getAllProductsDTO/get-all-products-dto';
import { AccountService } from '../../services/accountService/account.service';

@Component({
  selector: 'app-clothes',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ProductFilterComponent,
    ProductDetailsComponent,
  ],
  templateUrl: './clothes.component.html',
  styleUrl: './clothes.component.html',
})
export class ClothesComponent {
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number[] = [];
  products: Product[] = [];
  sentProduct!: Product;
  constructor(
    private productsService: ProductsService,
    private accountService: AccountService
  ) {
    this.moveToPage(this.pageSize, 1);
  }
  showFilteredProducts($event:GetAllProductsDTO) {
      this.products = $event.entities;
      this.totalPages = [];
      for (let i = 1; i <= $event.totalPages; i++) {
        this.totalPages.push(i);
      }
      this.currentPage = $event.currentPage;
  }
  moveToPage(pageSize: number, page: number) {
    this.productsService.getAllProducts(pageSize,page).subscribe({
      next: (res) => {
        this.products = res.entities;
        this.currentPage = res['currentPage'];
        this.totalPages = [];
        this.sentProduct = this.products[0];
        for (let i = 1; i <= res['totalPages']; i++) {
          this.totalPages.push(i);
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
  checkIfAuthorized() {
    return this.accountService.isAdmin();
  }
}
