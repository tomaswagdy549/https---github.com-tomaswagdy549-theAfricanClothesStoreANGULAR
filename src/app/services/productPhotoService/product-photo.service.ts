import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { GetAllProductPhotosDTO } from '../../models/DTOs/responseDTO/getAllProductPhotosDTO/get-all-product-photos-dto'; 

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
}
