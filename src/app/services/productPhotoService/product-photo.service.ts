import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { GetAllProductPhotosDTO } from '../../models/DTOs/responseDTO/getAllProductPhotosDTO/get-all-product-photos-dto'; 
import { AddedProductPhotoDTO } from '../../models/DTOs/requestDTO/addedProductPhotoDTO/added-product-photo-dto';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { ProductPhoto } from '../../models/productPhoto/product-photo';

@Injectable({
  providedIn: 'root',
})
export class ProductPhotoService {
  constructor(private http: HttpClient) {}
  getPhotoProductByProductId(ProductPhotoById: number): Observable<GetAllProductPhotosDTO> {
    return this.http.get<GetAllProductPhotosDTO>(
      `${enviroment.baseUrl}/api/productPhoto/${ProductPhotoById}`
    );
  }
  addPhotoProduct(addedProductPhotoDTO: FormData): Observable<GenericResponse<ProductPhoto>> {
    return this.http.post<GenericResponse<ProductPhoto>>(
      `${enviroment.baseUrl}/api/productPhoto?productId=${addedProductPhotoDTO.get("productId")}`,addedProductPhotoDTO
    );
  }
}
