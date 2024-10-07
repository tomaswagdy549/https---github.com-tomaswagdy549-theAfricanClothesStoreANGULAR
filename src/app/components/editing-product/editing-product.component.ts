import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';

import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-editing-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './editing-product.component.html',
  styleUrl: './editing-product.component.css'
})
export class EditingProductComponent  implements OnInit {

productForm: FormGroup;
  productImage: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  productId: string = ''; // Product ID to identify which product is being edited

  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Accessories' }
  ];

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    // private productService: ProductService // Inject your product service
  ) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    this.productId = this.route.snapshot.paramMap.get('id') || '';

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
    if (this.productForm.valid) {
      const formData = new FormData();
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      formData.append('description', this.productForm.get('description')?.value);
      formData.append('price', this.productForm.get('price')?.value);

      if (this.selectedFile) {
        formData.append('productImage', this.selectedFile);
      }

      // Submit updated data to the backend
      // this.productService.updateProduct(this.productId, formData).subscribe((response: any) => {
      //   console.log('Product updated successfully', response);
      // }, (error: any) => {
      //   console.error('Error updating product', error);
      // });
    }
  }
}