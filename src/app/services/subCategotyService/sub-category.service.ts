import { Injectable } from '@angular/core';
import { SubCategory } from '../../models/subCategory/sub-category';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { BaseResponse } from '../../models/DTOs/responseDTO/baseResponse/base-response';
import { AddedSubCategoryDTO } from '../../models/DTOs/requestDTO/addedSubCategoryDTO/added-sub-category-dto';
import { UpdatedSubCategoryDTO } from '../../models/DTOs/requestDTO/updatedSubCategoryDTO/updated-sub-category-dto';
import { GetAllSubCategoriesDTO } from '../../models/DTOs/responseDTO/getAllSubCategoriesDTO/get-all-sub-categories-dto';

@Injectable({
  providedIn: 'root',
})
export class SubCategoryService {
  constructor(private http: HttpClient) {}
  getAllSubCategories(
    pageSize: number,
    pageNumber: number
  ): Observable<GetAllSubCategoriesDTO> {
    return this.http.get<GetAllSubCategoriesDTO>(
      `${enviroment.baseUrl}/api/subCategory?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getSubCategoryById(subCategoryId: number): Observable<SubCategory> {
    return this.http.get<SubCategory>(
      `${enviroment.baseUrl}/api/category/${subCategoryId}`
    );
  }
  addSubCategory(
    AddedSubCategoryDTO: AddedSubCategoryDTO
  ): Observable<GenericResponse<SubCategory>> {
    return this.http.post<GenericResponse<SubCategory>>(
      `${enviroment.baseUrl}/api/subCategory`,
      AddedSubCategoryDTO
    );
  }
  editSubCategory(
    UpdatedSubCategoryDTO: UpdatedSubCategoryDTO
  ): Observable<GenericResponse<SubCategory>> {
    return this.http.put<GenericResponse<SubCategory>>(
      `${enviroment.baseUrl}/api/subCategory`,
      UpdatedSubCategoryDTO
    );
  }
  deleteSubCategory(subCategoryId: number): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      `${enviroment.baseUrl}/api/subCategory?subCategoryId=${subCategoryId}`
    );
  }
}
