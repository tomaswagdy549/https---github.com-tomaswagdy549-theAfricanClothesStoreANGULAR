import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { AddedProductAvailableSizesDTO } from '../../models/DTOs/requestDTO/addedProductAvailableSizesDTO/added-product-available-sizes-dto';
import { UpdatedProductAvailableDTO } from '../../models/DTOs/requestDTO/updatedProductAvailableDTO/updated-product-available-dto';

@Injectable({
  providedIn: 'root',
})
export class ProductAvailableSizeService {
  constructor(private http: HttpClient) {}
  addProductAvailableSize(
    AddedProductAvailableSizesDTO: AddedProductAvailableSizesDTO
  ) {
    return this.http.post(
      `${enviroment.baseUrl}/api/productAvailableSizes`,
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
