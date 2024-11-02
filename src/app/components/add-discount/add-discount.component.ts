import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
  FormsModule,
} from '@angular/forms';
import { CategoryService } from '../../services/categoryService/category.service';
import { Category } from '../../models/category/category';
import { DiscountService } from '../../services/discountService/discount.service';
import { ProductPhotoService } from '../../services/productPhotoService/product-photo.service';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { AddedDiscountDTO } from '../../models/DTOs/requestDTO/addedDiscountDTO/added-discount-dto';
@Component({
  selector: 'app-add-discount',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,FormsModule],
  templateUrl: './add-discount.component.html',
  styleUrl: './add-discount.component.css',
})
export class AddDiscountComponent {
  form: FormGroup;
  discountForm = new FormGroup({
    discountPercentage: new FormControl<number | null>(null, [
      Validators.required,
      Validators.min(1),
      Validators.max(99),
    ]),
    discountExpirationDate: new FormControl<string | null>(null, [
      Validators.required,
    ]),
    discountImage: new FormControl<File | null>(null),
  });
  // Options for select inputs
  discountImage:File|null=null
  gender = ['Woman', 'Men', 'Both'];

  collection = ['Summer', 'Winter', 'Both'];

  // Checkboxes for each group
  categories: Category[] = [];

  filteredCategories: Category[] = [];
  choosedCategories: Category[] = [];
  constructor(
    private fb: FormBuilder,
    private categoryService: CategoryService,
    private discountService: DiscountService,
  ) {
    this.form = this.fb.group({
      gender: new FormControl('', [Validators.required]),
      collection: new FormControl('', [Validators.required]),
    });
    this.categoryService.getAllCategories(500, 1).subscribe({
      next: (data) => {
        this.categories = data.categories;
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
  check($event: Event, category: Category) {
    const isChecked = ($event.target as HTMLInputElement).checked;
    if (isChecked) {
      this.choosedCategories.push(category);
    } else if (!isChecked) {
      const index = this.choosedCategories.indexOf(category);
      if (index != -1) {
        this.choosedCategories.splice(index, 1);
      }
    }
  }
  ngOnInit(): void {}

  onSubmit() {
    let string = this.discountForm.controls['discountExpirationDate']
      .value as string;
    const dateObject = new Date(string);
    const currentDate = new Date();
    const diffInHours = Math.ceil(
      Math.abs(dateObject.getTime() - currentDate.getTime()) / (1000 * 60 * 60)
    );
    let categoryIds: number[] = [];
    this.choosedCategories.filter((category,index) => {
      categoryIds.push(category.id);
    });
    let addedDiscountDTO: AddedDiscountDTO = {
      discountDurationInHours: diffInHours,
      discountPercentage:
        this.discountForm.controls['discountPercentage'].value! * 0.01,
      categoryIds: categoryIds,
      
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
