import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AddedDiscountDTO } from '../../models/DTOs/requestDTO/addedDiscountDTO/added-discount-dto';
import { enviroment } from '../../enviroment/enviroment';
import { Observable } from 'rxjs';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';

@Injectable({
  providedIn: 'root'
})
export class DiscountService {

  constructor(private http: HttpClient) { }
  addDiscount(addedDiscountDTO: AddedDiscountDTO): Observable<any> {
    return this.http.post<any>(
      `${enviroment.baseUrl}/api/discount`,
      addedDiscountDTO
    );
  }
  addDiscountImage(addedProductPhotoDTO: FormData): Observable<GenericResponse<string>> {
    return this.http.post<GenericResponse<string>>(
      `${enviroment.baseUrl}/api/discount/addDiscountImage`,addedProductPhotoDTO
    );
  }
  getDiscountImage(): Observable<any> {
    return this.http.get<any>(
      `${enviroment.baseUrl}/api/discount`
    );
  }

}
