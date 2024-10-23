import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { AddedProductAvailableSizesDTO } from '../../models/DTOs/requestDTO/addedProductAvailableSizesDTO/added-product-available-sizes-dto';
import { UpdatedProductAvailableDTO } from '../../models/DTOs/requestDTO/updatedProductAvailableDTO/updated-product-available-dto';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { ProductAvailableSizes } from '../../models/productAvailableSizes/product-available-sizes';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ProductAvailableSizeService {
  constructor(private http: HttpClient) {}
  addProductAvailableSize(
    AddedProductAvailableSizesDTO: AddedProductAvailableSizesDTO
  ): Observable<GenericResponse<ProductAvailableSizes>> {
    return this.http.post<GenericResponse<ProductAvailableSizes>>(
      `${enviroment.baseUrl}/api/productAvailableSizes`,
      AddedProductAvailableSizesDTO
    );
  }
  addRangeOfProductAvailableSize(
    AddedProductAvailableSizesDTO: AddedProductAvailableSizesDTO[]
  ) {
    return this.http.post(
      `${enviroment.baseUrl}/api/productAvailableSizes/addRange`,
      AddedProductAvailableSizesDTO
    );
  }
  editProductAvailableSize(
    updatedProductAvailableDTO: UpdatedProductAvailableDTO
  ) {
    return this.http.put(
      `${enviroment.baseUrl}/api/productAvailableSizes`,
      updatedProductAvailableDTO
    );
  }
  deleteProductAvailableSize(productId: number, size: string) {
    return this.http.delete(
      `${enviroment.baseUrl}/api/productAvailableSizes?productId=${productId}&availableSize=${size}`
    );
  }
}
