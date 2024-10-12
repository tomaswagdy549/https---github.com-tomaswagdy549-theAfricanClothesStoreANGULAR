import { ProductsService } from '../../services/productsService/products.service';
import { Observable } from 'rxjs';
import { GetAllProductsDTO } from '../../models/DTOs/responseDTO/getAllProductsDTO/get-all-products-dto';
import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
@Injectable({
  providedIn: 'root', // <-- You can add it here or in the module providers
})
export class womenShoesResolver implements Resolve<GetAllProductsDTO> {
  constructor(private productsService: ProductsService) {}
  resolve(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<GetAllProductsDTO> {
    return this.productsService.filterProducts('gender=female&categoryIds=6');
  }
}
