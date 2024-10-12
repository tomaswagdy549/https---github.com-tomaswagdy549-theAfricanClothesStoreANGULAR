import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { GetAllBrandsDTO } from '../../models/DTOs/responseDTO/getAllBrandsDTO/get-all-brands-dto';
import { Brand } from '../../models/brand/brand';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { AddedBrandDTO } from '../../models/DTOs/requestDTO/addedBrandDTO/added-brand-dto';
import { UpdatedBrandDTO } from '../../models/DTOs/requestDTO/updatedBrandDTO/updated-brand-dto';

@Injectable({
  providedIn: 'root',
})
export class BrandsService {
  constructor(private http: HttpClient) {}
  getAllBrands(
    pageSize: number,
    pageNumber: number
  ): Observable<GetAllBrandsDTO> {
    return this.http.get<GetAllBrandsDTO>(
      `${enviroment.baseUrl}/api/brand?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  getBrandById(brandId: number): Observable<Brand> {
    return this.http.get<Brand>(`${enviroment.baseUrl}/api/brand/${brandId}`);
  }
  addBrand(addedBrandDTO: AddedBrandDTO): Observable<GenericResponse<Brand>> {
    return this.http.post<GenericResponse<Brand>>(
      `${enviroment.baseUrl}/api/brand`,
      addedBrandDTO
    );
  }
  updateBrand(
    updatedBrandDTO: UpdatedBrandDTO
  ): Observable<GenericResponse<Brand>> {
    return this.http.put<GenericResponse<Brand>>(
      `${enviroment.baseUrl}/api/brand`,
      updatedBrandDTO
    );
  }
  deleteBrand(brandId: number): Observable<GenericResponse<Brand>> {
    return this.http.delete<GenericResponse<Brand>>(
      `${enviroment.baseUrl}/api/brand/${brandId}`
    );
  }
}
