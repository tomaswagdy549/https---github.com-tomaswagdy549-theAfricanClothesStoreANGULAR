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
import { Product } from '../../models/product/product';
import { SubCategory } from '../../models/subCategory/sub-category';
import { HandleResponse } from '../../handlingResponse/handle-response';

@Component({
  selector: 'app-editing-product',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './editing-product.component.html',
  styleUrl: './editing-product.component.css',
})
export class EditingProductComponent {
  productForm = new FormGroup({
    productName: new FormControl<string>('', Validators.required),
    brandId: new FormControl<number>(0, [
      Validators.required,
      Validators.min(1),
    ]),
    categoryId: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
    ]),
    gender: new FormControl<string>('', Validators.required),
    collection: new FormControl<string>('', Validators.required),
    price: new FormControl<number>(0, [Validators.required, Validators.min(1)]),
    note: new FormControl<string | null>(''),
    subCategoryId: new FormControl<number | null>(null),
    salePrice: new FormControl<number>(0),
    onSale: new FormControl<boolean>(false, Validators.required),
    discountExpirationDate: new FormControl<Date | null>(
      null
    ),
  });
  productAvailableSizesForm: FormArray<FormGroup>;
  productImage: string | null = null;
  selectedFile: File | null = null;
  imagePreview: string | ArrayBuffer | null = null;
  productAvailableSize: ProductAvailableSizes[] = [];
  categories: Category[] = [];
  displayedCategories: Category[] = [];
  subCategories: SubCategory[] = [];
  brands: Brand[] = [];
  productId: number = 0;
  showSalePrice: boolean = false;
  showCategory: boolean = false;
  showSubCategory: boolean = false;
  date!: Date;
  constructor(
    private route: ActivatedRoute,
    private productAvailableSizeService: ProductAvailableSizeService,
    private productService: ProductsService,
    private categoryService: CategoryService,
    private brandService: BrandsService
  ) {
    this.productAvailableSizesForm = new FormArray<FormGroup>([]);
    this.route.paramMap.subscribe((parms) => {
      this.productId = parseInt(parms.get('id')!);
    });
    this.productService.getProduct(this.productId).subscribe({
      next: (product) => {
        this.assignProductForm(product);
        console.log(product);
        if (product.subCategory != null) {
          this.showSubCategory = true;
        }
        this.showCategory =
          this.productForm.controls['gender'].value != '' &&
          this.productForm.controls['collection'].value != '';
        this.subscribeTheFormValueChanges();
        this.getCategories(product);
      },
    });
    this.getBrands();
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
  assignProductForm(product: Product) {
    this.productForm.controls['productName'].setValue(product.name);
    this.productForm.controls['price'].setValue(product.price);
    this.productForm.controls['gender'].setValue(product.category.gender);
    this.productForm.controls['categoryId'].setValue(product.categoryId);
    this.productForm.controls['brandId'].setValue(product.brandId);
    this.productForm.controls['note'].setValue(product.note);
    this.productForm.controls['salePrice'].setValue(product.salePrice);
    this.productForm.controls['subCategoryId'].setValue(product.subCategoryId);
    this.productForm.controls['onSale'].setValue(
      product.currentPrice != product.price
    );
    this.productForm.controls['discountExpirationDate'].setValue(
      product.discountExpirationDate
    );
    this.productForm.controls['collection'].setValue(
      product.category.collection
    );
    this.productAvailableSize = product.productAvailableSizes;
  }
  subscribeTheFormValueChanges() {
    this.productForm.controls['gender'].valueChanges.subscribe((gender) => {
      if (gender == '') {
        this.showCategory = false;
      } else {
        this.showCategory = true;
      }
      this.productForm.controls['categoryId'].setValue(null);
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
        if (collection == '') {
          this.showCategory = false;
        } else {
          this.showCategory = true;
        }
        this.productForm.controls['categoryId'].setValue(null);
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
        let category = this.categories.find((value) => {
          return value.id == categoryId;
        });
        if (category != undefined) {
          if (category!.subCategories.length > 0) {
            this.subCategories = category!.subCategories;
            this.productForm.controls['subCategoryId'].setValue(null);
            this.productForm.controls['subCategoryId'].addValidators([
              Validators.required,
              Validators.min(1),
            ]);
            this.showSubCategory = true;
            return;
          } else {
            this.productForm.controls['subCategoryId'].setValue(null);
            this.productForm.controls['subCategoryId'].clearValidators();
          }
        }
        this.showSubCategory = false;
        // this.productForm.controls['categoryId'].clearValidators();
        // this.productForm.controls['categoryId'].setValue(null);
      }
    );
  }
  getBrands() {
    this.brandService.getAllBrands(50, 1).subscribe({
      next: (brands) => {
        this.brands = brands.brands;
      },
    });
  }
  getCategories(product: Product) {
    this.categoryService.getAllCategories(50, 1).subscribe({
      next: (categories) => {
        this.categories = categories.categories;
        this.categories.map((category) => {
          if (
            category.gender == product.category.gender &&
            category.collection == product.category.collection
          ) {
            this.displayedCategories.push(category);
          }
          if (
            category.id == product.categoryId &&
            product.subCategory != null
          ) {
            this.subCategories = category.subCategories;
          }
        });
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
  async onSubmit() {
    if (this.productForm.valid) {
      const confirmed = await HandleResponse.operationConfirmed(
        'Are you sure you want to Edit this product ?'
      );
      if (confirmed) {
        this.getHoursDiff(
          this.productForm.controls['discountExpirationDate'].value
        );
        let updatedProductDTO: UpdatedProductDTO = {
          Id: this.productId,
          price: this.productForm.controls['price'].value!,
          name: this.productForm.controls['productName'].value!,
          categoryId: this.productForm.controls['categoryId'].value!,
          brandId: this.productForm.controls['brandId'].value!,
          subCategoryId: this.productForm.controls['subCategoryId'].value,
          onSale: this.productForm.controls['onSale'].value!,
          salePrice: this.productForm.controls['salePrice'].value,
          note: this.productForm.controls['note'].value,
          discountDurationInHours: this.getHoursDiff(
            this.productForm.controls['discountExpirationDate'].value
          ),
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
  }
  getHoursDiff(value: Date | null): number | null {
    if (value != null) {
      let specific = value.toString();
      const currentDate = new Date();
      const specificDate = new Date(specific);
      const diffInHours = Math.ceil(
        Math.abs(specificDate.getTime() - currentDate.getTime()) /
          (1000 * 60 * 60)
      );
      return diffInHours;
    }
    return null;
  }
  NewSize() {
    this.productAvailableSizesForm.push(
      new FormGroup({
        size: new FormControl('', Validators.required),
        quantity: new FormControl(0, Validators.required),
      })
    );
  }
  getTime(value: Date) {
    const egyptDate = new Date(value).toLocaleString('en-EG', {
      timeZone: 'Africa/Cairo',
    });
    return egyptDate
  }
  async addNewSize(index: number) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to add this size ?'
    );
    if (confirmed) {
      let formGroup = this.productAvailableSizesForm.at(index);
      let addedProductAvailableSizesDTO: AddedProductAvailableSizesDTO = {
        availabeSize: formGroup.get('size')!.value,
        quantity: formGroup.get('quantity')!.value,
        productId: this.productId,
      };
      this.productAvailableSizeService
        .addProductAvailableSize(addedProductAvailableSizesDTO)
        .subscribe({
          next: (response) => {
            this.productAvailableSize.push(response.entity);
          },
        });
    }
  }
  async editProductSize(productAvailableSizes: ProductAvailableSizes) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to edit this size ?'
    );
    if (confirmed) {
      let updatedProductAvailableDTO: UpdatedProductAvailableDTO = {
        productId: productAvailableSizes.productId,
        availabeSize: productAvailableSizes.availabeSize,
        quantity: productAvailableSizes.quantity,
      };
      this.productAvailableSizeService
        .editProductAvailableSize(updatedProductAvailableDTO)
        .subscribe({
          next: (response) => {
            console.log(
              'Product available size updated successfully:',
              response
            );
          },
        });
    }
  }
  async deleteProductSize(productAvailableSize: ProductAvailableSizes) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to delete this size ?'
    );
    if (confirmed) {
      this.productAvailableSizeService
        .deleteProductAvailableSize(
          productAvailableSize.productId,
          productAvailableSize.availabeSize
        )
        .subscribe({
          next: (response) => {
            this.productAvailableSize.map((size, index) => {
              if (
                size.availabeSize == productAvailableSize.availabeSize &&
                size.productId == productAvailableSize.productId
              ) {
                this.productAvailableSize.splice(index, 1);
              }
            });
          },
        });
    }
  }
  getArray(): any {
    return this.productAvailableSizesForm.controls;
  }
  getFormGroup(index: number): FormGroup<any> {
    return this.productAvailableSizesForm.at(index);
  }
}
