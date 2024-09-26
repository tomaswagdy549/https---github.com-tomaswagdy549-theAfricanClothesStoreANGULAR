import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { GetAllCategoriesDTO } from '../../models/DTOs/getAllModelsDTO/getAllCategoriesDTO/get-all-categories-dto';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  constructor(private http: HttpClient) { }
  getAllCategories(pageSize:number,pageNumber:number) : Observable<GetAllCategoriesDTO> {
    return this.http.get<GetAllCategoriesDTO>(`${enviroment.baseUrl}/api/category/getAllCategories?pageNumber=${pageNumber}&pageSize=${pageSize}`);
  }
}
