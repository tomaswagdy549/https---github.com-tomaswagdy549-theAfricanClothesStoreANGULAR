import { CommonModule } from '@angular/common';
import { Component, input, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ProductsService } from '../../services/productsService/products.service';
import { Product } from '../../models/product/product';

@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-details.component.html',
  styleUrl: './product-details.component.css'
})
export class ProductDetailsComponent implements OnChanges  { 
  @Input() product!:Product
  constructor(private productsService: ProductsService){

  }
  ngOnChanges(changes: SimpleChanges): void {
    console.log(changes['product'])
  }
}
