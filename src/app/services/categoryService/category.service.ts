import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { GetAllCategoriesDTO } from '../../models/DTOs/responseDTO/getAllCategoriesDTO/get-all-categories-dto'; 
import { Category } from '../../models/category/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }
  getAllCategories(pageSize:number,pageNumber:number) : Observable<GetAllCategoriesDTO> {
    return this.http.get<GetAllCategoriesDTO>(`${enviroment.baseUrl}/api/category?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
  getCategoryById(categoryId:number) : Observable<Category> {
    return this.http.get<Category>(`${enviroment.baseUrl}/api/category/${categoryId}`);
  }
}
