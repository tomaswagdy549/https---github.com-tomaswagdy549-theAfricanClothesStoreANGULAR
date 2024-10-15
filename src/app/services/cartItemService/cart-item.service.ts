import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { AddedCartItemDTO } from '../../models/DTOs/requestDTO/addedCartItemDTO/added-cart-item-dto';
import { CartItem } from '../../models/cartItem/cart-item';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { BaseResponse } from '../../models/DTOs/responseDTO/baseResponse/base-response';
import { CartItemCompositeKey } from '../../models/DTOs/requestDTO/cartItemCompositeKey/cart-item-composite-key';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor(private http: HttpClient) {}
  cartItemAdded = new Subject<CartItem>();
  cartItemEdited = new Subject<CartItem>();
  cartDeleted = new Subject<boolean>();
  addToCart(cartItem: AddedCartItemDTO): Observable<GenericResponse<CartItem>> {
    return this.http.post<GenericResponse<CartItem>>(
      `${enviroment.baseUrl}/api/cartItems`,
      cartItem
    );
  }
  removeFromCart(cartItem: CartItem): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      `${enviroment.baseUrl}/api/cartItems/cartId/${cartItem.cartId}/productId/${cartItem.productId}/size/${cartItem.size}`
    );
  }
  removeRangeFromCart(
    CartItemCompositeKeys: CartItemCompositeKey[]
  ): Observable<any> {
    return this.http.delete(`${enviroment.baseUrl}/api/cartItems`, {
      body: CartItemCompositeKeys,
    });
  }
  getCartItemsByCartId(cartId: string): Observable<CartItem[]> {
    return this.http.get<CartItem[]>(
      `${enviroment.baseUrl}/api/cartItems/cartId/${cartId}`
    );
  }
  editCartItem(cartItem: CartItem): Observable<GenericResponse<CartItem>> {
    return this.http.put<GenericResponse<CartItem>>(
      `${enviroment.baseUrl}/api/cartItems`,
      cartItem
    );
  }
}
