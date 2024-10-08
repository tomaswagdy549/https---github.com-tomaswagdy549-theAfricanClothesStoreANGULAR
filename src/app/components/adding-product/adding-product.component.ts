import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/categoryService/category.service';
import { BrandsService } from '../../services/brandsService/brands.service';
import { Category } from '../../models/category/category';
import { Brand } from '../../models/brand/brand';

@Component({
  selector: 'app-adding-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adding-product.component.html',
  styleUrl: './adding-product.component.css',
})
export class AddingProductComponent {
  productForm: FormGroup;
  categories: Category[] = [];
  brands: Brand[] = [];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      brandId: ['', Validators.required],
      categoryId: ['', Validators.required],
      gender: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
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

  // File selection for image upload with preview
  onFileSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedFile = file;

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      alert('Please select a valid image file.');
    }
  }

  // Form submission
  onSubmit(): void {
    if (this.productForm.valid && this.selectedFile) {
      const formData = new FormData();
      formData.append(
        'productName',
        this.productForm.get('productName')?.value
      );
      formData.append('categoryId', this.productForm.get('categoryId')?.value);
      formData.append(
        'description',
        this.productForm.get('description')?.value
      );
      formData.append('price', this.productForm.get('price')?.value);
      formData.append('productImage', this.selectedFile);

      // Submit formData to your backend API (example)
      console.log('Form Data:', formData);

      // Example API call:
      // this.productService.addProduct(formData).subscribe(response => {
      //   console.log('Product added successfully', response);
      // }, error => {
      //   console.error('Error adding product', error);
      // });
    }
  }
}
