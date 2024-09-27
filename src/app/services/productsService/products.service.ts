import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { GetAllProductsDTO } from '../../models/DTOs/responseDTO/getAllProductsDTO/get-all-products-dto'; 
import { Product } from '../../models/product/product';

@Injectable({
  providedIn: 'root',
})
export class ProductsService {
  constructor(private http: HttpClient) {}
  getAllProducts(
    pageSize: number,
    pageNumber: number
  ): Observable<GetAllProductsDTO> {
    return this.http.get<GetAllProductsDTO>(
      `${enviroment.baseUrl}/api/products/getAllProducts?pageNumber=${pageNumber}&pageSize=${pageSize}`
    );
  }
  filterProducts(
    querySearch: string
  ): Observable<Product[]> {
    return this.http.get<Product[]>(
      `${enviroment.baseUrl}/api/products/filterProduct?${querySearch}`,
    );
  }
}
