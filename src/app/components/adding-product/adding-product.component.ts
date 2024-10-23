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
import { AddedProductDTO } from '../../models/DTOs/requestDTO/addedProductDTO/added-product-dto';
import { ProductAvailableSizeService } from '../../services/productAvailableService/product-available-size.service';
import { AddedProductAvailableSizesDTO } from '../../models/DTOs/requestDTO/addedProductAvailableSizesDTO/added-product-available-sizes-dto';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { ProductPhotoService } from '../../services/productPhotoService/product-photo.service';
import { SubCategory } from '../../models/subCategory/sub-category';
import { ProductsService } from '../../services/productsService/products.service';

@Component({
  selector: 'app-adding-product',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './adding-product.component.html',
  styleUrl: './adding-product.component.css',
})
export class AddingProductComponent {
  productForm: FormGroup = new FormGroup({
    productName: new FormControl('', Validators.required),
    brandId: new FormControl('', Validators.required),
    categoryId: new FormControl('', Validators.required),
    gender: new FormControl('', Validators.required),
    collection: new FormControl('', Validators.required),
    price: new FormControl('', [Validators.required, Validators.min(1)]),
    note: new FormControl(''),
    subCategoryId: new FormControl(0),
    salePrice: new FormControl(null),
    onSale: new FormControl(false, Validators.required),
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
  displayedCategories: Category[] = [];
  displayedSubCategories: SubCategory[] = [];
  categories: Category[] = [];
  brands: Brand[] = [];
  selectedPhoto: File | null = null;
  selectedPhotos:
    | { file: File; imagePreview: string | ArrayBuffer | null }[]
    | null = [];
  imagePreview: string | ArrayBuffer | null = null;
  showSubCategories: boolean = false;
  showSalePrice: boolean = false;

  constructor(
    private productAvailableSizeService: ProductAvailableSizeService,
    private productsService: ProductsService,
    private productPhotoService: ProductPhotoService,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) {
    this.productForm.controls['gender'].valueChanges.subscribe((value) => {});
    this.categoryService.getAllCategories(50, 1).subscribe({
      next: (categories) => {
        this.categories = categories.categories;
        this.displayedCategories = this.categories;
      },
    });
    this.brandService.getAllBrands(12, 1).subscribe({
      next: (brands) => {
        this.brands = brands.brands;
      },
    });
    this.productForm.controls['gender'].valueChanges.subscribe((gender) => {
      this.displayedCategories = this.categories.filter((value) => {
        return (
          value.gender == gender &&
          (value.collection == this.productForm.controls['collection'].value ||
            this.productForm.controls['collection'].value == '')
        );
      });
    });
    this.productForm.controls['collection'].valueChanges.subscribe(
      (collection) => {
        this.displayedCategories = this.categories.filter((value) => {
          return (
            value.collection == collection &&
            (value.gender == this.productForm.controls['gender'].value ||
              this.productForm.controls['gender'].value == '')
          );
        });
      }
    );
    this.productForm.controls['categoryId'].valueChanges.subscribe(
      (categoryId) => {
        this.productForm.controls['subCategoryId'].removeValidators([
          Validators.required,
        ]);
        this.productForm.controls['subCategoryId'].setValue('');
        this.showSubCategories = false;
        for (let i = 0; i < this.categories.length; i++) {
          if (
            this.categories[i].id == categoryId &&
            this.categories[i].subCategories.length > 0
          ) {
            this.displayedSubCategories = this.categories[i].subCategories;
            this.productForm.controls['subCategoryId'].addValidators([
              Validators.required,
            ]);
            this.showSubCategories = true;
            break;
          }
        }
      }
    );
    this.productForm.controls['onSale'].valueChanges.subscribe((onSale) => {
      if (onSale) {
        this.productForm.controls['salePrice'].addValidators([
          Validators.required,
        ]);
        this.showSalePrice = true;
      } else {
        this.productForm.controls['salePrice'].removeValidators([
          Validators.required,
        ]);
        this.productForm.controls['salePrice'].setValue(null);
        this.showSalePrice = false;
      }
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
  async onSubmit() {
    if (this.productForm.valid) {
      const confirmed = await HandleResponse.operationConfirmed(
        'Are you sure you want to add this product ?'
      );
      if (confirmed) {
        let addedProductDTO: AddedProductDTO = {
          name: this.productForm.get('productName')!.value,
          categoryId: this.productForm.get('categoryId')!.value,
          brandId: this.productForm.get('brandId')!.value,
          price: this.productForm.get('price')!.value,
          imageOfProduct: this.selectedPhoto!,
          note: this.productForm.get('note')!.value,
          subCategoryId: this.productForm.get('subCategoryId')!.value,
          salePrice: this.productForm.get('salePrice')!.value,
          onSale: this.productForm.get('onSale')!.value,
        };
        let formData = new FormData();
        formData.append('name', addedProductDTO.name);
        formData.append('categoryId', addedProductDTO.categoryId.toString());
        formData.append('brandId', addedProductDTO.brandId.toString());
        formData.append('price', addedProductDTO.price.toString());
        formData.append('imageOfProduct', addedProductDTO.imageOfProduct);
        formData.append('note', addedProductDTO.note!);
        formData.append(
          'subCategoryId',
          addedProductDTO.subCategoryId!.toString()
        );
        formData.append(
          'salePrice',
          addedProductDTO.salePrice == null
            ? ''
            : addedProductDTO.salePrice.toString()
        );
        formData.append('onSale', addedProductDTO.onSale ? 'true' : 'false');
        this.productsService.addProduct(formData).subscribe({
          next: (response) => {
            this.addProductAvailableSizes(response.entity.id);
          },
        });
      }
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
        },
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
