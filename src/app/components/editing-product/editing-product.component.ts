import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/productsService/products.service';
import { CategoryService } from '../../services/categoryService/category.service';
import { BrandsService } from '../../services/brandsService/brands.service';
import { Category } from '../../models/category/category';
import { Brand } from '../../models/brand/brand';
import { ProductAvailableSizes } from '../../models/productAvailableSizes/product-available-sizes';
import { UpdatedProductDTO } from '../../models/DTOs/requestDTO/updatedProductDTO/updated-product-dto';
import { ProductAvailableSizeService } from '../../services/productAvailableService/product-available-size.service';
import { UpdatedProductAvailableDTO } from '../../models/DTOs/requestDTO/updatedProductAvailableDTO/updated-product-available-dto';
import { AddedProductAvailableSizesDTO } from '../../models/DTOs/requestDTO/addedProductAvailableSizesDTO/added-product-available-sizes-dto';

@Component({
  selector: 'app-editing-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editing-product.component.html',
  styleUrl: './editing-product.component.css',
})
export class EditingProductComponent {
  productForm: FormGroup;
  productAvailableSizesForm: FormArray<FormGroup>;
  productImage: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  productAvailableSize: ProductAvailableSizes[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  productId: number = 0;
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productAvailableSizeService: ProductAvailableSizeService,
    private productService: ProductsService,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      categoryId: [0, [Validators.required, Validators.min(1)]],
      brandId: [0, [Validators.required, Validators.min(1)]],
      gender: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
    });
    this.productAvailableSizesForm = new FormArray<FormGroup>([]);
    this.route.paramMap.subscribe((parms) => {
      this.productId = parseInt(parms.get('id')!);
    });
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.productForm.controls['productName'].setValue(product.name);
        this.productForm.controls['price'].setValue(product.price);
        this.productForm.controls['gender'].setValue(product.gender);
        this.productForm.controls['categoryId'].setValue(product.categoryId);
        this.productForm.controls['brandId'].setValue(product.brandId);
        this.productAvailableSize = product.productAvailableSizes;
      },
      error: (error) => {
        console.error('Error fetching product:', error);
      },
    });
    this.categoryService.getAllCategories(12, 1).subscribe({
      next: (categories) => {
        this.categories = categories.categories;
      },
    });
    this.brandService.getAllBrands(12, 1).subscribe({
      next: (brands) => {
        this.brands = brands.brands;
      },
    });
  }

  // File selection for updating product image
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;

      // Generate preview of the new selected image
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  }

  // Submit updated product data
  onSubmit(): void {
    if (this.productForm.valid) {
      let updatedProductDTO: UpdatedProductDTO = {
        Id: this.productId,
        price: this.productForm.controls['price'].value,
        name: this.productForm.controls['productName'].value,
        gender: this.productForm.controls['gender'].value,
        categoryId: this.productForm.controls['categoryId'].value,
        brandId: this.productForm.controls['brandId'].value,
      };
      this.productService.updateProduct(updatedProductDTO).subscribe({
        next: (response) => {
          console.log('Product updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating product:', error);
        },
      });
    }
  }
  NewSize() {
    this.productAvailableSizesForm.push(
      new FormGroup({
        size: new FormControl('', Validators.required),
        quantity: new FormControl(0, Validators.required),
      })
    );
  }
  addNewSize(index: number) {
    let formGroup = this.productAvailableSizesForm.at(index);
    let addedProductAvailableSizesDTO: AddedProductAvailableSizesDTO = {
      availabeSize: formGroup.get('size')!.value,
      quantity: formGroup.get('quantity')!.value,
      productId: this.productId,
    };
    this.productAvailableSizeService.addProductAvailableSize(addedProductAvailableSizesDTO).subscribe({
      next: (response) => {
        console.log('Product available size added successfully:', response);
      },
      error: (error) => {
        console.error('Error adding product available size:', error);
      }
    })
  }
  editProductSize(productAvailableSizes: ProductAvailableSizes) {
    let updatedProductAvailableDTO: UpdatedProductAvailableDTO = {
      productId: productAvailableSizes.productId,
      availabeSize: productAvailableSizes.availabeSize,
      quantity: productAvailableSizes.quantity,
    };
    this.productAvailableSizeService
      .editProductAvailableSize(updatedProductAvailableDTO)
      .subscribe({
        next: (response) => {
          console.log('Product available size updated successfully:', response);
        },
        error: (error) => {
          console.error('Error updating product available size:', error);
        },
      });
  }
  deleteProductSize(productAvailableSize: ProductAvailableSizes) {
    this.productAvailableSizeService
      .deleteProductAvailableSize(
        productAvailableSize.productId,
        productAvailableSize.availabeSize
      )
      .subscribe({
        next: (response) => {
          console.log('Product size deleted successfully:', response);
        },
        error: (error) => {
          console.error('Error deleting product size:', error);
        },
      });
  }
  getArray(): any {
    return this.productAvailableSizesForm.controls;
  }
  getFormGroup(index: number): FormGroup<any> {
    return this.productAvailableSizesForm.at(index);
  }
}
