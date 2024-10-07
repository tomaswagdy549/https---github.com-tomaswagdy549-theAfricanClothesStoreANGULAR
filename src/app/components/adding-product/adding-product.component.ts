import { Component } from '@angular/core';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-adding-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adding-product.component.html',
  styleUrl: './adding-product.component.css'
})
export class AddingProductComponent {

  productForm: FormGroup;
  categories = [
    { id: 1, name: 'Electronics' },
    { id: 2, name: 'Clothing' },
    { id: 3, name: 'Accessories' }
  ];
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;

  constructor(private fb: FormBuilder) {
    this.productForm = this.fb.group({
      productName: ['', Validators.required],
      category: ['', Validators.required],
      description: ['', Validators.required],
      price: ['', [Validators.required, Validators.min(1)]],
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
      formData.append('productName', this.productForm.get('productName')?.value);
      formData.append('category', this.productForm.get('category')?.value);
      formData.append('description', this.productForm.get('description')?.value);
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
