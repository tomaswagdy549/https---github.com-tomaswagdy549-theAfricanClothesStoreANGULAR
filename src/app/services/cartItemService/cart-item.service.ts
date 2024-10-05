import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { CartItem } from '../../models/cartItem/cart-item';

@Injectable({
  providedIn: 'root'
})
export class CartItemService {

  constructor(private http: HttpClient) {}
  addToCart(cartItem:CartItem): Observable<any> {
    return this.http.post<any>(
      `${enviroment.baseUrl}/api/cartItems`,cartItem
    );
  }
  getBrandById(brandId:number) : Observable<any> {
    return this.http.get<any>(`${enviroment.baseUrl}/api/brand/${brandId}`);
  }
  
}
