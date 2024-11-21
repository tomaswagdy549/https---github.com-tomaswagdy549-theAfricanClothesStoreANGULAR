import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { AddedCartItemDTO } from '../../models/DTOs/requestDTO/addedCartItemDTO/added-cart-item-dto';
import { CartItem } from '../../models/cartItem/cart-item';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { BaseResponse } from '../../models/DTOs/responseDTO/baseResponse/base-response';
import { CartItemCompositeKey } from '../../models/DTOs/requestDTO/cartItemCompositeKey/cart-item-composite-key';
import { UpdatedCartItemDTO } from '../../models/DTOs/requestDTO/updatedCartItemDTO/updated-cart-item-dto';

@Injectable({
  providedIn: 'root',
})
export class CartItemService {
  constructor(private http: HttpClient) {}
  cartItemAdded = new Subject<CartItem>();
  cartItemEdited = new Subject<CartItem>();
  cartDeleted = new Subject<boolean>();
  cartItemSelected = new Subject<CartItem>();
  addToCart(cartItem: AddedCartItemDTO): Observable<GenericResponse<CartItem>> {
    return this.http.post<GenericResponse<CartItem>>(
      `${enviroment.baseUrl}/api/cartItems`,
      cartItem
    );
  }
  removeFromCart(
    CartItemCompositeKey: CartItemCompositeKey
  ): Observable<BaseResponse> {
    return this.http.delete<BaseResponse>(
      `${enviroment.baseUrl}/api/cartItems`,
      { body: CartItemCompositeKey }
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
  editCartItem(
    UpdatedCartItemDTO: UpdatedCartItemDTO
  ): Observable<GenericResponse<CartItem>> {
    return this.http.put<GenericResponse<CartItem>>(
      `${enviroment.baseUrl}/api/cartItems`,
      UpdatedCartItemDTO
    );
  }
}
