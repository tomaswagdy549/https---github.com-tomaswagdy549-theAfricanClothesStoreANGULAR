import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllBrandsDTO } from '../../models/DTOs/getAllModelsDTO/getAllBrandsDTO/get-all-brands-dto';
import { Brand } from '../../models/brand/brand';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}
  getAllBrands(pageSize: number, pageNumber: number): Observable<GetAllBrandsDTO> {
    return this.http.get<GetAllBrandsDTO>(
      `${enviroment.baseUrl}/api/brand/getAllBrands?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getBrandById(brandId:number) : Observable<Brand> {
    return this.http.get<Brand>(`${enviroment.baseUrl}/api/brand/getBrandById/${brandId}`);
  }
}
