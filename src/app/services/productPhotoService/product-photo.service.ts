import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { ProductPhoto } from '../../models/productPhoto/product-photo';

@Injectable({
  providedIn: 'root',
})
export class ProductPhotoService {
  constructor(private http: HttpClient) {}
  getProductPhotoById(ProductPhotoById: number): Observable<ProductPhoto> {
    return this.http.get<ProductPhoto>(
      `${enviroment.baseUrl}/api/productPhoto/getPhotoProductById/${ProductPhotoById}`
    );
  }
}
