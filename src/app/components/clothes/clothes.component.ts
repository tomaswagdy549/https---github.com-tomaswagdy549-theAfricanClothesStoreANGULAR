import {
  Component,
  ComponentRef,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ProductsService } from '../../services/productsService/products.service';
import { Product } from '../../models/product/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';
import { GetAllProductsDTO } from '../../models/DTOs/responseDTO/getAllProductsDTO/get-all-products-dto';
import { AccountService } from '../../services/accountService/account.service';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { Router } from '@angular/router';

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
  async deleteProduct(productId: number) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to Delete this product ?'
    );
    if (confirmed) {
      this.productsService.deleteProduct(productId).subscribe({
        next: (response) => {
          this.products.map((product) => {
            if (product.id === productId) {
              this.products.splice(this.products.indexOf(product), 1);
            }
            if (this.products.length == 0) {
              this.router.navigateByUrl('not-found');
            }
          });
        },
      });
    }
  }
  showProduct(product: Product) {
    this.sentProduct = product;
  }
  @ViewChild('productDetails', { read: ViewContainerRef })
  productDetailsEntry!: ViewContainerRef;
  ProductDetailsComponent!: ComponentRef<ProductDetailsComponent>;
  pageSize: number = 6;
  currentPage: number = 1;
  querySearch: string = '';
  totalPages: number[] = [];
  products: Product[] = [];
  sentProduct!: Product;
  constructor(
    private productsService: ProductsService,
    private accountService: AccountService,
    private resolver: ViewContainerRef,
    private router: Router
  ) {
    this.productDetailsEntry = this.resolver;
    this.moveToPage(this.pageSize, 1);
  }
  showFilteredProducts($event: {
    querySearch: string;
    GetAllProductsDTO: GetAllProductsDTO;
  }) {
    this.products = $event.GetAllProductsDTO.entities;
    this.totalPages = [];
    for (let i = 1; i <= $event.GetAllProductsDTO.totalPages; i++) {
      this.totalPages.push(i);
    }
    this.currentPage = $event.GetAllProductsDTO.currentPage;
    this.querySearch = $event.querySearch;
  }
  moveToPage(pageSize: number, page: number) {
    // this.productsService.getAllProducts(pageSize, page).subscribe({
    this.productsService
      .filterProducts(
        this.querySearch + `&pageNumber=${page}&pageSize=${pageSize}`
      )
      .subscribe({
        next: (res) => {
          this.products = res.entities;
          this.currentPage = res['currentPage'];
          this.totalPages = [];
          this.sentProduct = this.products[0];
          for (let i = 1; i <= res['totalPages']; i++) {
            this.totalPages.push(i);
          }
          window.scrollTo({ top: 0, behavior: 'smooth' });
          // this.buildProductDetails()
        },
        error: (err) => {
          console.log(err);
        },
      });
  }
  checkIfAuthorized() {
    return this.accountService.isAdmin();
  }
  buildProductDetails() {
    this.ProductDetailsComponent = this.productDetailsEntry.createComponent(
      ProductDetailsComponent
    );
    this.ProductDetailsComponent.setInput('productId', 1);
  }
}
