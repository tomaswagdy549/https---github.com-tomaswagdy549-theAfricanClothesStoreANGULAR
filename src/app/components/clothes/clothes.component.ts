import {
  Component,
  ComponentFactoryResolver,
  ComponentRef,
  OnInit,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { ProductsService } from '../../services/productsService/products.service';
import { Product } from '../../models/product/product';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ProductFilterComponent } from '../product-filter/product-filter.component';
import { ProductDetailsComponent } from '../product-details/product-details.component';

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
export class ClothesComponent implements OnInit {
  pageSize: number = 6;
  currentPage: number = 1;
  totalPages: number[] = [];
  products: Product[] = [];
  sentProduct!: Product;
  @ViewChild('container', { read: ViewContainerRef }) entry:ViewContainerRef;
  productDetailsComponent!:ComponentRef<ProductDetailsComponent>
  constructor(private productsService: ProductsService,private resolver: ViewContainerRef) {
    this.entry=resolver
  }
  ngOnInit(): void {
    this.moveToPage(this.pageSize, 1);
  }
  show($event: Product[]) {
    this.products = $event;
  }
  moveToPage(pageSize: number, Page: number) {
    this.entry.clear()
    this.productsService.getAllProducts(pageSize, Page).subscribe({
      next: (res) => {
        this.products = res.products;
        this.currentPage = res['currentPage'];
        this.totalPages = [];
        this.sentProduct = this.products[0];
        this.productDetailsComponent = this.entry.createComponent(ProductDetailsComponent)
        this.productDetailsComponent.setInput('product',this.sentProduct)    
        for (let i = 1; i <= res['totalPages']; i++) {
          this.totalPages.push(i);
        }
      },
      error: (err) => {
        console.log(err);
      },
    });
  }
}
