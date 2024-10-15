import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { ProductPhoto } from '../../models/productPhoto/product-photo';

@Injectable({
  providedIn: 'root',
})
export class ProductPhotoService {
  constructor(private http: HttpClient) {}
  getPhotoProductByProductId(productId: number): Observable<ProductPhoto[]> {
    return this.http.get<ProductPhoto[]>(
      `${enviroment.baseUrl}/api/productPhoto/ProductId/${productId}`
    );
  }
  addPhotoProduct(addedProductPhotoDTO: FormData): Observable<GenericResponse<ProductPhoto>> {
    return this.http.post<GenericResponse<ProductPhoto>>(
      `${enviroment.baseUrl}/api/productPhoto?productId=${addedProductPhotoDTO.get("productId")}`,addedProductPhotoDTO
    );
  }
}
