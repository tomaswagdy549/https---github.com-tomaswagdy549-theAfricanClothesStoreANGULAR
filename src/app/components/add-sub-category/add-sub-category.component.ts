import { Component } from '@angular/core';
import { SubCategoryService } from '../../services/subCategotyService/sub-category.service';
import { CommonModule } from '@angular/common';
import { AddedSubCategoryDTO } from '../../models/DTOs/requestDTO/addedSubCategoryDTO/added-sub-category-dto';
import { SubCategory } from '../../models/subCategory/sub-category';
import { FormsModule } from '@angular/forms';
import { CategoryService } from '../../services/categoryService/category.service';
import { Category } from '../../models/category/category';
import { UpdatedSubCategoryDTO } from '../../models/DTOs/requestDTO/updatedSubCategoryDTO/updated-sub-category-dto';
import { HandleResponse } from '../../handlingResponse/handle-response';

@Component({
  selector: 'app-add-sub-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './add-sub-category.component.html',
  styleUrl: './add-sub-category.component.css',
})
export class AddSubCategoryComponent {
  gender: string = '';
  collection: string = '';
  showSubCategoryAdd: boolean = false;
  subCategories: SubCategory[] = [];
  categories: Category[] = [];
  addedSubCategoryDTO: AddedSubCategoryDTO = {
    name: '',
    categoryId: 0,
  };
  constructor(
    private subCategoryService: SubCategoryService,
    private categoryService: CategoryService
  ) {
    this.categoryService.getAllCategories(50, 1).subscribe({
      next: (response) => {
        this.categories = response.categories;
        console.log(this.categories);
        this.categories.forEach((category) => {
          if (category.subCategories.length > 0)
            this.subCategories.push(...category.subCategories);
        });
      },
    });
  }
  async onSubmit() {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to add this sub category ?'
    );
    if (confirmed) {
      this.subCategoryService
        .addSubCategory(this.addedSubCategoryDTO)
        .subscribe({
          next: (data) => {
            this.subCategories.push(data.entity);
          },
        });
    }
  }
  getCategories(category: Category): Category[] {
    let categories: Category[] = [];
    this.categories.map((categoryElement) => {
      if (
        categoryElement.gender == category.gender &&
        categoryElement.collection == category.collection
      ) {
        categories.push(categoryElement);
      }
    });
    return categories;
  }
  async deleteSubCategory(id: number) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to delete this sub category ?'
    );
    if (confirmed) {
      this.subCategoryService.deleteSubCategory(id).subscribe({
        next: (data) => {
          this.categories.map((category) => {
            if (category.subCategories.length > 0) {
              category.subCategories.forEach((subCategory) => {
                if (subCategory.id == id) {
                  category.subCategories.splice(
                    category.subCategories.indexOf(subCategory),
                    1
                  );
                  return;
                }
              });
            }
          });
        },
      });
    }
  }
  async editSubCategory(subCategory: SubCategory) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to edit this sub category ?'
    );
    if (confirmed) {
      let UpdatedSubCategoryDTO: UpdatedSubCategoryDTO = {
        Id: subCategory.id,
        categoryId: subCategory.categoryId,
        name: subCategory.name,
      };
      this.subCategoryService
        .editSubCategory(UpdatedSubCategoryDTO)
        .subscribe({});
    }
  }
  getFilteredCategories(gender: string, collection: string): Category[] {
    let categories: Category[] = [];
    this.categories.map((categoryElement) => {
      if (
        categoryElement.gender == gender &&
        categoryElement.collection == collection
      ) {
        categories.push(categoryElement);
      }
    });
    return categories;
  }
  async addSubCategory() {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to add this sub category ?'
    );
    if (confirmed) {
      this.subCategoryService.addSubCategory(this.addedSubCategoryDTO).subscribe({
        next: (data) => {
          this.categories.map((category) => {
            if (category.id == this.addedSubCategoryDTO.categoryId) {
              category.subCategories.push(data.entity);
              return;
            }
          });
          this.gender = '';
          this.collection = '';
          this.addedSubCategoryDTO.categoryId = 0;
          this.addedSubCategoryDTO.name = '';
        },
      });
  
    }
  }
}
