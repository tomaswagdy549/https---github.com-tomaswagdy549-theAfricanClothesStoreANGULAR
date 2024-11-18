import { Injectable } from '@angular/core';
import { Coupon } from '../../models/coupon/coupon';
import { GenericResponse } from '../../models/DTOs/responseDTO/genericResponse/generic-response';
import { Observable } from 'rxjs';
import { enviroment } from '../../enviroment/enviroment';
import { HttpClient } from '@angular/common/http';
import { AddedCouponDTO } from '../../models/DTOs/requestDTO/addedCouponDTO/added-coupon-dto';
import { AppliedCouponDTO } from '../../models/DTOs/requestDTO/appliedCouponDTO/applied-coupon-dto';

@Injectable({
  providedIn: 'root'
})
export class CouponService {

  constructor(private http:HttpClient) { }
  addCoupon(AddedCouponDTO: AddedCouponDTO): Observable<GenericResponse<Coupon>> {
    return this.http.post<GenericResponse<Coupon>>(
      `${enviroment.baseUrl}/api/coupon`,AddedCouponDTO
    );
  }
  applyCoupon(appliedCouponDTO: AppliedCouponDTO): Observable<GenericResponse<Coupon>> {
    return this.http.post<GenericResponse<Coupon>>(
      `${enviroment.baseUrl}/api/coupon/applyCoupon`,appliedCouponDTO
    );
  }


}

