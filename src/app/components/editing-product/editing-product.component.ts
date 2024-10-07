import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { ProductsService } from '../../services/productsService/products.service';
import { CategoryService } from '../../services/categoryService/category.service';
import { BrandsService } from '../../services/brandsService/brands.service';
import { Category } from '../../models/category/category';
import { Brand } from '../../models/brand/brand';
import { ProductPhoto } from '../../models/productPhoto/product-photo';
import { ProductAvailableSizes } from '../../models/productAvailableSizes/product-available-sizes';

@Component({
  selector: 'app-editing-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editing-product.component.html',
  styleUrl: './editing-product.component.css',
})
export class EditingProductComponent implements OnInit {
  productForm: FormGroup;
  productImage: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  productId: number = 0; 
  productAvailableSize:ProductAvailableSizes[]=[]
  categories: Category[] = [];
  brands: Brand[] = [];
  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private productService: ProductsService,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      categoryId: [0, [Validators.required,Validators.min(1)]],
      brandId: [0, [Validators.required,Validators.min(1)]],
      gender: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
    });
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
        this.productAvailableSize = product.productAvailableSizes
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

  ngOnInit(): void {
    // Fetch existing product data by ID and populate the form
    // this.productService.getProductById(this.productId).subscribe((product: { name: any; categoryId: any; description: any; price: any; imageUrl: string | null; }) => {
    //   this.productForm.patchValue({
    //     productName: product.name,
    //     category: product.categoryId,
    //     description: product.description,
    //     price: product.price,
    //   });
    //   this.productImage = product.imageUrl; // Load current product image
    // });
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
    // if (this.productForm.valid) {
      console.log(this.productForm)
      // const formData = new FormData();
      // formData.append(
      //   'productName',
      //   this.productForm.get('productName')?.value
      // );
      // formData.append('category', this.productForm.get('category')?.value);
      // formData.append(
      //   'description',
      //   this.productForm.get('description')?.value
      // );
      // formData.append('price', this.productForm.get('price')?.value);

      // if (this.selectedFile) {
      //   formData.append('productImage', this.selectedFile);
      // }

      // Submit updated data to the backend
      // this.productService.updateProduct(this.productId, formData).subscribe((response: any) => {
      //   console.log('Product updated successfully', response);
      // }, (error: any) => {
      //   console.error('Error updating product', error);
      // });
    // }
  }
}
