import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BrandsService } from '../../services/brandsService/brands.service';
import { CategoryService } from '../../services/categoryService/category.service';
import { Brand } from '../../models/brand/brand';
import { Category } from '../../models/category/category';
import { ProductsService } from '../../services/productsService/products.service';
import { Product } from '../../models/product/product';
import { GetAllProductsDTO } from '../../models/DTOs/responseDTO/getAllProductsDTO/get-all-products-dto';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  brands: Brand[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  filterForm: FormGroup = new FormGroup({
    brandIds: new FormControl<number[] | null>([]),
    categoryIds: new FormControl<number[] | null>([]),
    availableSizes: new FormControl<string[]>([]),
    quantity: new FormControl<number | null>(null, Validators.min(0)),
    minPrice: new FormControl<number | null>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number | null>(null, [Validators.min(0)]),
    name: new FormControl<string>(''),
  });
  @Output() productsFiltered = new EventEmitter<GetAllProductsDTO>()
  constructor(
    private brandsService: BrandsService,
    private CategoryService: CategoryService,
    private productsService: ProductsService
  ) {
    this.getAllBrands(10, 1);
    this.getAllCategories(10, 1);
  }
  getAllBrands(pageSize: number, currentPage: number) {
    this.brandsService.getAllBrands(pageSize, currentPage).subscribe({
      next: (res) => {
        this.brands = res.brands;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  getAllCategories(pageSize: number, currentPage: number) {
    this.CategoryService.getAllCategories(pageSize, currentPage).subscribe({
      next: (res) => {
        this.categories = res.categories;
      },
      error: (error) => {
        console.log(error);
      },
    });
  }
  filterProducts() {
    let brandIdsQuery =  ``;
      this.filterForm.value['brandIds'].map((brandId: number)=>{
        brandIdsQuery += `brandIds=${brandId}&`
      })
    let categoryIdsQuery = ``;
    this.filterForm.value['categoryIds'].map((categoryId: number)=>{
      brandIdsQuery += `categoryIds=${categoryId}&`
    })
    let availableSizesQuery =  ``;
    this.filterForm.value['availableSizes'].map((availableSize: number)=>{
      brandIdsQuery += `availableSizes=${availableSize}&`
    })
    let quantityQuery =
      this.filterForm.value['quantity'] !== null
        ? `quantity=${this.filterForm.value['quantity']}`
        : ``;
    let minPriceQuery =
      this.filterForm.value['minPrice'] !== null
        ? `minPrice=${this.filterForm.value['minPrice']}`
        : ``;
    let maxPriceQuery =
      this.filterForm.value['maxPrice'] !== null
        ? `maxPrice=${this.filterForm.value['maxPrice']}`
        : ``;
    let nameQuery =
      this.filterForm.value['name'] != ''
        ? `name=${this.filterForm.value['name']}`
        : ``;
    // Combine all the queries, filtering out any empty strings
    let queries = [
      brandIdsQuery,
      categoryIdsQuery,
      availableSizesQuery,
      quantityQuery,
      minPriceQuery,
      maxPriceQuery,
      nameQuery,
    ]
      .filter((query) => query) // remove empty queries
      .join('&');
    let totalQuery = `${queries}`;
    console.log(totalQuery)
    this.productsService.filterProducts(totalQuery).subscribe({
      next: (response) => {
        this.productsFiltered.emit(response)
      },
      error: (error) => {
        console.error('Error fetching products:', error);
      },
    });
  }
}
