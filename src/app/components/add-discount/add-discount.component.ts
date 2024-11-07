import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
  ValidationErrors,
} from '@angular/forms';
import { CategoryService } from '../../services/categoryService/category.service';
import { Category } from '../../models/category/category';
import { DiscountService } from '../../services/discountService/discount.service';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { AddedDiscountDTO } from '../../models/DTOs/requestDTO/addedDiscountDTO/added-discount-dto';
import { SubCategory } from '../../models/subCategory/sub-category';
import { CategoryDirectory } from '../../models/DTOs/requestDTO/addedDiscountDTO/categoryDirectory/category-directory';
@Component({
  selector: 'app-add-discount',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  templateUrl: './add-discount.component.html',
  styleUrl: './add-discount.component.css',
})
export class AddDiscountComponent {
  checkIfExsist(category: Category) {
    let result = this.choosedCategories.some(
      (value) => value.id == category.id
    );
    return result;
  }
  form: FormGroup;
  discountForm = new FormGroup({
    discountPercentage: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
    ]),
    discountExpirationDate: new FormControl<string | null>(null, [
      Validators.required,
      this.futureDateValidator
    ]),
  });
  futureDateValidator(control: FormControl): ValidationErrors | null {
    const selectedDate = new Date(control.value as string);
    const now = new Date();

    // Check if selected date is in the past
    return selectedDate > now ? null : { futureDate: true };
  }
  // Options for select inputs
  discountImage: File | null = null;
  gender = ['Woman', 'Men', 'Both'];

  collection = ['Summer', 'Winter', 'Both'];
  categoryIds: CategoryDirectory[] = [];
  // Checkboxes for each group
  categories: Category[] = [];
  filteredCategories: Category[] = [];
  subCategories: SubCategory[] = [];
  choosedCategories: Category[] = [];
  choosedSubCategories: SubCategory[] = [];
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private discountService: DiscountService
  ) {
    this.form = this.fb.group({
      gender: new FormControl('', [Validators.required]),
      collection: new FormControl('', [Validators.required]),
    });
    this.categoryService.getAllCategories(500, 1).subscribe({
      next: (data) => {
        this.categories = data.categories;
        this.categories.forEach((category) => {
          if (category.subCategories.length > 0) {
            category.subCategories.map((subcategory) => {
              subcategory.category = category;
            });
            this.subCategories.push(...category.subCategories);
          }
        });
      },
      error: (error) => {
        console.error('Error:', error);
      },
    });
    // Add checkbox controls to the form group
    this.form.controls['gender'].valueChanges.subscribe((gender) => {
      this.filteredCategories = this.categories.filter(
        (category) =>
          category.gender == gender &&
          (category.collection == 'both' ||
            category.collection == this.form.controls['collection'].value ||
            this.form.controls['collection'].value == '')
      );
    });
    this.form.controls['collection'].valueChanges.subscribe((collection) => {
      this.filteredCategories = this.categories.filter(
        (category) =>
          category.collection == collection &&
          (category.gender == 'both' ||
            category.gender == this.form.controls['gender'].value ||
            this.form.controls['gender'].value == '')
      );
    });
  }
  changeCategory($event: Event, category: Category) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.choosedCategories.push(category);
      this.categoryIds.push({
        categoryId: category.id,
        subCategoryId: null,
      });
    } else if (!isChecked) {
      const categoryIndex = this.choosedCategories.indexOf(category);
      if (categoryIndex != -1) {
        this.choosedCategories.splice(categoryIndex, 1);
        this.categoryIds.map((ctegoryId)=>{
          if(ctegoryId.categoryId == category.id && ctegoryId.subCategoryId==null){
            this.categoryIds.splice(this.categoryIds.indexOf(ctegoryId),1);
          }
        }) 
      }
    }
  }
  changeSubCategory($event: Event, subCategory: SubCategory) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.choosedSubCategories.push(subCategory);
      this.categoryIds.push({
        categoryId: subCategory.category.id,
        subCategoryId: subCategory.id,
      });
    } else if (!isChecked) {
      const index = this.choosedSubCategories.indexOf(subCategory);
      if (index != -1) {
        this.choosedSubCategories.splice(index, 1);
        this.categoryIds.map((ctegoryId)=>{
          if(ctegoryId.categoryId == subCategory.category.id && ctegoryId.subCategoryId==subCategory.id){
            this.categoryIds.splice(this.categoryIds.indexOf(ctegoryId),1);
          }
        }) 

      }
    }
  }

  onSubmit() {
    let string = this.discountForm.controls['discountExpirationDate']
      .value as string;
    const dateObject = new Date(string);
    const currentDate = new Date();
    const diffInHours = Math.ceil(
      Math.abs(dateObject.getTime() - currentDate.getTime()) / (1000 * 60 * 60)
    );
    let addedDiscountDTO: AddedDiscountDTO = {
      discountDurationInHours: diffInHours,
      discountPercentage:
        this.discountForm.controls['discountPercentage'].value! * 0.01,
      categoryIds: this.categoryIds,
    };
    this.discountService.addDiscount(addedDiscountDTO).subscribe({
      next: (response) => {
        this.addDiscountImage();
      },
    });
  }
  onPhotoSelected(event: any): void {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      this.discountImage = file;
    } else {
      HandleResponse.handleError('Please select a valid image file.');
    }
  }
  addDiscountImage() {
    if (this.discountImage != null) {
      let form = new FormData();
      form.append('discountImage', this.discountImage);
      this.discountService.addDiscountImage(form).subscribe();
    }
  }
}
