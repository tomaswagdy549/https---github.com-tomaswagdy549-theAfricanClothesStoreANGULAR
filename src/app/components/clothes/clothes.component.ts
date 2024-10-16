import { Component, ComponentRef, ViewChild, ViewContainerRef } from '@angular/core';
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
  @ViewChild('productDetails', { read: ViewContainerRef })
  productDetailsEntry!: ViewContainerRef;
  ProductDetailsComponent!: ComponentRef<ProductDetailsComponent>;
  pageSize: number = 6;
  currentPage: number = 1;
  querySearch:string=''
  totalPages: number[] = [];
  products: Product[] = [];
  sentProduct!: Product;
  constructor(
    private productsService: ProductsService,
    private accountService: AccountService,
    private resolver: ViewContainerRef
  ) {
    this.productDetailsEntry = this.resolver
    this.moveToPage(this.pageSize, 1);
  }
  showFilteredProducts($event: {querySearch:string,GetAllProductsDTO:GetAllProductsDTO}) {
    this.products = $event.GetAllProductsDTO.entities;
    this.totalPages = [];
    for (let i = 1; i <= $event.GetAllProductsDTO.totalPages; i++) {
      this.totalPages.push(i);
    }
    this.currentPage = $event.GetAllProductsDTO.currentPage;
    this.querySearch = $event.querySearch
  }
  moveToPage(pageSize: number, page: number) {
    // this.productsService.getAllProducts(pageSize, page).subscribe({
      this.productsService.filterProducts(this.querySearch+`&pageNumber=${page}&pageSize=${pageSize}`).subscribe({
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
  buildProductDetails(){
    this.ProductDetailsComponent = this.productDetailsEntry.createComponent(ProductDetailsComponent);
    this.ProductDetailsComponent.setInput("productId",1)
  }
}
