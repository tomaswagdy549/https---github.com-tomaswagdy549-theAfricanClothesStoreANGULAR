import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisteredUserDTO } from '../../models/DTOs/requestDTO/registeredUserDTO/registered-user-dto';
import { LoggedUserDTO } from '../../models/DTOs/requestDTO/loggedUserDTO/logged-user-dto'; 
import { jwtDecode } from 'jwt-decode';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  isLogged = new BehaviorSubject<boolean>(false)
  userData: any = null;
  constructor(private http: HttpClient) {}
  register(RegisteredUserDTO: RegisteredUserDTO): Observable<any> {
    return this.http.post<any>(
      `${enviroment.baseUrl}/api/user/register`,
      RegisteredUserDTO
    );
  }
  login(LoggedUserDTO: LoggedUserDTO): Observable<any> {
    return this.http.post<any>(
      `${enviroment.baseUrl}/api/user/login`,
      LoggedUserDTO
    );
  }
  private decodeToken(){
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token!);
    this.userData = decoded
  }
  logUser(){
    this.isLogged.next(true)
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token!);
    this.userData = decoded
  }
  getCartId(){
    console.log(this.userData)
    return this.userData['cartId'] as string
  }
}
