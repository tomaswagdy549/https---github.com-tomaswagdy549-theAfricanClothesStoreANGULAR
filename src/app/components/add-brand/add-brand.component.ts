import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { Router } from '@angular/router';
import { Brand } from '../../models/brand/brand';
import { CommonModule } from '@angular/common';
import { BrandsService } from '../../services/brandsService/brands.service';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { SubCategory } from '../../models/subCategory/sub-category';

@Component({
  selector: 'app-add-brand',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './add-brand.component.html',
  styleUrl: './add-brand.component.css',
})
export class AddBrandComponent {
  brandForm!: FormGroup;
  submitted = false;

  private fb = inject(FormBuilder); // Injecting FormBuilder
  private brandService = inject(BrandsService); // Injecting BrandService
  private router = inject(Router); // Injecting Router

  constructor() {
    this.initializeForm();
  }

  // Initialize the form with validation rules
  initializeForm(): void {
    this.brandForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
    });
  }

  // Getter for easy access to form controls
  get f() {
    return this.brandForm.controls;
  }

  // Handle form submission
  onSubmit(): void {
    this.submitted = true;

    if (this.brandForm.invalid) {
      return;
    }

    // Create the brand object based on the form data
    const newBrand: Brand = {
      id: 0, // Backend should handle the ID generation
      name: this.brandForm.value.name, // Get the name from the form
      products: [], // Leave products as an empty array for now
    };

    this.brandService.addBrand(newBrand).subscribe({
      next:(response)=> {
        console.log('Brand added successfully:', response);
        this.router.navigate(['/brands']); // Navigate to brand list page after successful addition
      },
      error: (err: any) => {
        console.error('Error adding brand:', err);
      },
    });
  }
}
