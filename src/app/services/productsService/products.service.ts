import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { GetAllProductsDTO } from '../../models/DTOs/responseDTO/getAllProductsDTO/get-all-products-dto';
import { Product } from '../../models/product/product';
import { UpdatedProductDTO } from '../../models/DTOs/requestDTO/updatedProductDTO/updated-product-dto';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { BaseResponse } from '../../models/DTOs/responseDTO/baseResponse/base-response';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  addProduct(addedProductDTO: FormData): Observable<GenericResponse<Product>> {
    return this.http.post<GenericResponse<Product>>(
      `${enviroment.baseUrl}/api/products`,
      addedProductDTO
    );
  }
  getAllProducts(
    pageSize: number,
    pageNumber: number
  ): Observable<GetAllProductsDTO> {
    return this.http.get<GetAllProductsDTO>(
      `${enviroment.baseUrl}/api/products?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  sortProducts(
    querySearch: string,
  ): Observable<GetAllProductsDTO> {
    return this.http.get<GetAllProductsDTO>(
      `${enviroment.baseUrl}/api/products/sortProduct?${querySearch}`
    );
  }
  getProduct(id: number): Observable<Product> {
    return this.http.get<Product>(
      `${enviroment.baseUrl}/api/products/Id/${id}`
    );
  }
  updateProduct(updatedProductDTO: UpdatedProductDTO): Observable<any> {
    return this.http.put<any>(
      `${enviroment.baseUrl}/api/products`,
      updatedProductDTO
    );
  }
  filterProducts(querySearch: string): Observable<GetAllProductsDTO> {
    return this.http.get<GetAllProductsDTO>(
      `${enviroment.baseUrl}/api/products/filterProduct?${querySearch}`
    );
  }
  deleteProduct(productId: number): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      `${enviroment.baseUrl}/api/products?Id=${productId}`,
    );
  }
}
//http://localhost:41180/api/products/sortProduct?ascending=false&pageNumber=2&pageSize=12