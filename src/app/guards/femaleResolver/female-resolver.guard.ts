import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { GetAllProductsDTO } from '../../models/DTOs/responseDTO/getAllProductsDTO/get-all-products-dto';
import { Observable } from 'rxjs';
import { ProductsService } from '../../services/productsService/products.service';
import { Injectable } from '@angular/core';
@Injectable({
  providedIn: 'root', // <-- You can add it here or in the module providers
})

export class  femaleResolverGuard implements Resolve<GetAllProductsDTO>{
  constructor(private productsService: ProductsService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<GetAllProductsDTO>{
    return this.productsService.filterProducts('gender=female');
  }
}
