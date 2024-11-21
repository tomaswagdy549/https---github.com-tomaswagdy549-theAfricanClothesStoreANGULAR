import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisteredUserDTO } from '../../models/DTOs/requestDTO/registeredUserDTO/registered-user-dto';
import { LoggedUserDTO } from '../../models/DTOs/requestDTO/loggedUserDTO/logged-user-dto';
import { jwtDecode } from 'jwt-decode';
import { Router } from '@angular/router';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { SocialUser } from '@abacritt/angularx-social-login';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  isLogged = new BehaviorSubject<boolean>(false);
  private userData: any = null;
  constructor(private http: HttpClient, private router: Router) {}
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
  logOut() {
    this.isLogged.next(false);
    this.userData = null;
    localStorage.removeItem('token');
    this.router.navigateByUrl('/');
    HandleResponse.handleSuccess('logged out');
  }
  logUser() {
    this.decodeToken();
    this.isLogged.next(true);
  }
  getCartId() {
    if (this.userData != null) {
      return this.userData[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/nameidentifier'
      ] as string;
    }
    return null;
  }
  getUserId() {
    if (this.userData != null) {
      return this.userData[
        'http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'
      ] as string;
    }
    return null;
  }
  isAdmin() {
    if (this.userData != null) {
      let role = this.userData[
        'http://schemas.microsoft.com/ws/2008/06/identity/claims/role'
      ] as string;
      role = role.toLowerCase();
      if (role == 'admin') {
        return true;
      }
    }
    return false;
  }
  checkIfTokenExpired() {
    const currentTimestamp = Math.floor(Date.now() / 1000);
    if (
      new Date(currentTimestamp * 1000) > new Date(this.userData['exp'] * 1000)
    ) {
      return true;
    }
    return false;
  }

  private decodeToken() {
    const token = localStorage.getItem('token');
    const decoded = jwtDecode(token!);
    this.userData = decoded;
  }
}
