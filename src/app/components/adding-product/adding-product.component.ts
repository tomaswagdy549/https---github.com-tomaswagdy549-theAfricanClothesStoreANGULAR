import { Component } from '@angular/core';

import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { CategoryService } from '../../services/categoryService/category.service';
import { BrandsService } from '../../services/brandsService/brands.service';
import { Category } from '../../models/category/category';
import { Brand } from '../../models/brand/brand';
import { ProductsService } from '../../services/productsService/products.service';
import { AddedProductDTO } from '../../models/DTOs/requestDTO/addedProductDTO/added-product-dto';
import { ProductAvailableSizeService } from '../../services/productAvailableService/product-available-size.service';
import { AddedProductAvailableSizesDTO } from '../../models/DTOs/requestDTO/addedProductAvailableSizesDTO/added-product-available-sizes-dto';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { ProductPhotoService } from '../../services/productPhotoService/product-photo.service';
import { AddedProductPhotoDTO } from '../../models/DTOs/requestDTO/addedProductPhotoDTO/added-product-photo-dto';

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
  selectedPhoto: File | null = null;
  selectedPhotos:
    | { file: File; imagePreview: string | ArrayBuffer | null }[]
    | null = [];
  imagePreview: string | ArrayBuffer | null = null;

  constructor(
    private productsService: ProductsService,
    private productAvailableSizeService: ProductAvailableSizeService,
    private productPhotoService: ProductPhotoService,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) {
    this.productForm = new FormGroup({
      productName: new FormControl('', Validators.required),
      brandId: new FormControl('', Validators.required),
      categoryId: new FormControl('', Validators.required),
      gender: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      availableSize: new FormArray(
        [
          new FormGroup({
            size: new FormControl('', Validators.required),
            quantity: new FormControl(null, [
              Validators.required,
              Validators.min(1),
            ]),
          }),
        ],
        [Validators.minLength(1), this.uniqueSizeQuantityValidator()]
      ),
      photos: new FormArray(
        [new FormControl<File | null>(null)],
        [Validators.minLength(1), this.uniqueSizeQuantityValidator()]
      ),
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
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.selectedPhoto = file;

      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(file);
    } else {
      HandleResponse.handleError('Please select a valid image file.');
    }
  }
  onProductPhotosSelected(event: any) {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      // Generate preview
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedPhotos?.push({ file: file, imagePreview: reader.result });
      };
      reader.readAsDataURL(file);
    } else {
      HandleResponse.handleError('Please select a valid image file.');
    }
  }

  // Form submission
  onSubmit(): void {
    if (this.productForm.valid) {
      let addedProductDTO: AddedProductDTO = {
        name: this.productForm.get('productName')!.value,
        gender: this.productForm.get('gender')!.value,
        categoryId: this.productForm.get('categoryId')!.value,
        brandId: this.productForm.get('brandId')!.value,
        price: this.productForm.get('price')!.value,
        imageOfProduct: this.selectedPhoto!,
      };
      let formData = new FormData();
      formData.append('name', addedProductDTO.name);
      formData.append('gender', addedProductDTO.gender);
      formData.append('categoryId', addedProductDTO.categoryId.toString());
      formData.append('brandId', addedProductDTO.brandId.toString());
      formData.append('price', addedProductDTO.price.toString());
      formData.append('imageOfProduct', addedProductDTO.imageOfProduct);
      this.productsService.addProduct(formData).subscribe({
        next: (response) => {
          this.addProductAvailableSizes(response.entity.id);
        }
      });
    }
  }
  getFormGroup(index: number): FormGroup {
    let formArray: FormArray = this.getArray() as FormArray;
    let formGroup: FormGroup = formArray.at(index) as FormGroup;
    return formGroup;
  }
  getArray(): any {
    let formArray: FormArray = this.productForm.controls[
      'availableSize'
    ] as FormArray;
    return formArray.controls;
  }
  deleteSize(index: number) {
    let formArray = this.productForm.controls['availableSize'] as FormArray;
    formArray.removeAt(index);
  }
  NewSize() {
    let formArray = this.productForm.controls['availableSize'] as FormArray;
    formArray.push(
      new FormGroup({
        size: new FormControl('', Validators.required),
        quantity: new FormControl(null, [
          Validators.required,
          Validators.min(1),
        ]),
      })
    );
  }
  addProductAvailableSizes(productId: number) {
    let AddedProductAvailableSizes: AddedProductAvailableSizesDTO[] = [];
    let formArray = this.productForm.controls[
      'availableSize'
    ] as FormArray<FormGroup>;
    formArray.controls.forEach((form) => {
      let AddedProductAvailableSize: AddedProductAvailableSizesDTO = {
        productId: productId,
        availabeSize: form.controls['size'].value,
        quantity: form.controls['quantity'].value,
      };
      AddedProductAvailableSizes.push(AddedProductAvailableSize);
    });
    this.productAvailableSizeService
      .addRangeOfProductAvailableSize(AddedProductAvailableSizes)
      .subscribe({
        next: (response) => {
          this.addProductPhotos(productId);
        }
      });
  }
  addProductPhotos(productId: number) {
    this.selectedPhotos?.forEach((photo) => {
      let productPhoto: FormData = new FormData();
      productPhoto.append('productId', productId.toString());
      productPhoto.append('photo', photo.file);
      this.productPhotoService.addPhotoProduct(productPhoto).subscribe({});
    });
  }

  private uniqueSizeQuantityValidator(): ValidatorFn {
    return (formArray: AbstractControl): ValidationErrors | null => {
      const controls = (formArray as FormArray).controls;
      const seenCombinations = new Set<string>();
      for (const control of controls) {
        const group = control as FormGroup;
        const size = group.get('size')?.value;
        const key = `${size}`;
        if (seenCombinations.has(key)) {
          return { duplicate: true }; // If duplicate, return an error
        }
        seenCombinations.add(key);
      }
      return null; // Return null if no duplicates
    };
  }
}