import { CommonModule } from '@angular/common';
import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
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
import { HandleResponse } from '../../handlingResponse/handle-response';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-filter',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './product-filter.component.html',
  styleUrl: './product-filter.component.css',
})
export class ProductFilterComponent {
  sortByPrice(ascending: boolean) {
    document.getElementById('filter-button')?.click()
    this.router.navigateByUrl(`sortedProducts/${this.searchQuery}&ascending=${ascending}`)
  }
  @Input() searchQuery!: string;
  brands: Brand[] = [];
  categories: Category[] = [];
  filteredProducts: Product[] = [];
  filterForm: FormGroup = new FormGroup({
    brandIds: new FormControl<number>(0),
    categoryIds: new FormControl<number>(0),
    availableSizes: new FormControl<string | null>(null),
    quantity: new FormControl<number | null>(null, Validators.min(0)),
    minPrice: new FormControl<number | null>(null, [Validators.min(0)]),
    maxPrice: new FormControl<number | null>(null, [Validators.min(0)]),
    name: new FormControl<string | null>(null),
    gender: new FormControl<string | null>(null),
  });
  @Output() productsFiltered = new EventEmitter<{
    querySearch: string;
    GetAllProductsDTO: GetAllProductsDTO;
  }>();
  constructor(
    private brandsService: BrandsService,
    private CategoryService: CategoryService,
    private productsService: ProductsService,
    private router : Router
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
    let pageNumber = 1;
    let pageSize = 6;
    let queries = this.getSearchQuery();
    let pagingQuery = [
      queries,
      `&pageNumber= ${pageNumber}`,
      `&pageSize= ${pageSize}`,
    ]
      .filter((query) => query)
      .join('');
    let totalQuery = `${pagingQuery}`;
    this.productsService.filterProducts(totalQuery).subscribe({
      next: (response) => {
        if (response != null) {
          this.productsFiltered.emit({
            querySearch: queries,
            GetAllProductsDTO: response,
          });
        } else {
          HandleResponse.handleError(
            'there are no product like you search , try again later'
          );
        }
      },
    });
  }
  getSearchQuery(): string {
    let brandIdsQuery =
      this.filterForm.value['brandIds'] != 0
        ? `brandIds=${this.filterForm.value['brandIds']}`
        : ``;
    let categoryIdsQuery =
      this.filterForm.value['categoryIds'] != 0
        ? `categoryIds=${this.filterForm.value['categoryIds']}`
        : ``;
    let availableSizesQuery =
      this.filterForm.value['availableSizes'] != null
        ? `availableSizes=${this.filterForm.value['availableSizes']}`
        : ``;
    let genderQuery =
      this.filterForm.value['gender'] != null
        ? `gender=${this.filterForm.value['gender']}`
        : ``;
    let nameQuery =
      this.filterForm.value['name'] != null
        ? `name=${this.filterForm.value['name']}`
        : ``;
    let quantityQuery =
      this.filterForm.value['quantity'] != null
        ? `quantity=${this.filterForm.value['quantity']}`
        : ``;

    let minPriceQuery =
      this.filterForm.value['minPrice'] != null
        ? `minPrice=${this.filterForm.value['minPrice']}`
        : ``;
    let maxPriceQuery =
      this.filterForm.value['maxPrice'] != null
        ? `maxPrice=${this.filterForm.value['maxPrice']}`
        : ``;
    // Combine all the queries, filtering out any empty strings
    let queries = [
      brandIdsQuery,
      categoryIdsQuery,
      availableSizesQuery,
      genderQuery,
      quantityQuery,
      minPriceQuery,
      maxPriceQuery,
      nameQuery,
    ]
      .filter((query) => query) // remove empty queries
      .join('&');
    return queries;
  }
}
