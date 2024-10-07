import { Injectable } from '@angular/core';
import { AddedOrderDTO } from '../../models/DTOs/requestDTO/addedOrderDTO/added-order-dto';
import { HttpClient } from '@angular/common/http';
import { enviroment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { Order } from '../../models/order/order';

@Injectable({
  providedIn: 'root',
})
export class OrderService {
  constructor(private http: HttpClient) {}
  addOrder(addedOrderDTO: AddedOrderDTO): Observable<GenericResponse<Order>> {
    return this.http.post<GenericResponse<Order>>(
      `${enviroment.baseUrl}/api/order`,
      addedOrderDTO
    );
  }
}
