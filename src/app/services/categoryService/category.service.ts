import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { GetAllCategoriesDTO } from '../../models/DTOs/responseDTO/getAllCategoriesDTO/get-all-categories-dto';
import { Category } from '../../models/category/category';
import { UpdatedCategoryDTO } from '../../models/DTOs/requestDTO/updatedCategoryDTO/updated-category-dto';
import { AddedCategoryDTO } from '../../models/DTOs/requestDTO/addedCategoryDTO/added-category-dto';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { BaseResponse } from '../../models/DTOs/responseDTO/baseResponse/base-response';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}
  getAllCategories(
    pageSize: number,
    pageNumber: number
  ): Observable<GetAllCategoriesDTO> {
    return this.http.get<GetAllCategoriesDTO>(
      `${enviroment.baseUrl}/api/category?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getCategoryById(categoryId: number): Observable<Category> {
    return this.http.get<Category>(
      `${enviroment.baseUrl}/api/category/${categoryId}`
    );
  }
  addCategory(categoryName: AddedCategoryDTO): Observable<GenericResponse<Category>> {
    return this.http.post<GenericResponse<Category>>(
      `${enviroment.baseUrl}/api/category`,categoryName
    );
  }
  editCategory(UpdatedCategoryDTO: UpdatedCategoryDTO): Observable<GenericResponse<Category>> {
    return this.http.put<GenericResponse<Category>>(
      `${enviroment.baseUrl}/api/category`,UpdatedCategoryDTO
    );
  }
  deleteCategory(categoryId: number): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      `${enviroment.baseUrl}/api/category?categoryId=${categoryId}`
    );
  }

}
