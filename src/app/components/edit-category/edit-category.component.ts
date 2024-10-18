import { Component } from '@angular/core';
import { CategoryService } from '../../services/categoryService/category.service';
import { Category } from '../../models/category/category';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { UpdatedCategoryDTO } from '../../models/DTOs/requestDTO/updatedCategoryDTO/updated-category-dto';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { AddedCategoryDTO } from '../../models/DTOs/requestDTO/addedCategoryDTO/added-category-dto';

@Component({
  selector: 'app-edit-category',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-category.component.html',
  styleUrl: './edit-category.component.css',
})
export class EditCategoryComponent {
  newCategory: AddedCategoryDTO ={
    name: '',
    gender: '',
    collection: '',
  }
  categories: Category[] = [];
  showCategoryAdd: boolean = false;
  constructor(private categoryService: CategoryService) {
    this.categoryService.getAllCategories(50, 1).subscribe({
      next: (response) => {
        this.categories = response.categories;
        console.log(this.categories)
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
  async addCategory() {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to add this category ?'
    );
    if (confirmed) {
      this.categoryService
        .addCategory(this.newCategory)
        .subscribe({
          next: (response) => {
            this.categories.push(response.entity);
            this.showCategoryAdd = false;
          },
        });
    }
  }
  async editCategory(editedCategory: Category) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to edit this category ?'
    );
    if (confirmed) {
      let updatedCategoryDTO: UpdatedCategoryDTO = {
        gender:editedCategory.gender,
        collection:editedCategory.collection,
        name: editedCategory.name,
        Id: editedCategory.id,
      };
      this.categoryService.editCategory(updatedCategoryDTO).subscribe({});
    }
  }
  async deleteCategory(categoryId: number) {
    const confirmed = await HandleResponse.operationConfirmed(
      'Are you sure you want to delete this category ?'
    );
    if (confirmed) {
      this.categoryService.deleteCategory(categoryId).subscribe({
        next: (response) => {
          this.categories = this.categories.filter(
            (category) => category.id !== categoryId
          );
        },
      });
    }
  }
}
