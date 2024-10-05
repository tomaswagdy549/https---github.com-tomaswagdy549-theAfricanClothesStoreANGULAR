import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { enviroment } from '../../enviroment/enviroment';
import { BehaviorSubject, Observable } from 'rxjs';
import { RegisteredUserDTO } from '../../models/DTOs/requestDTO/registeredUserDTO/registered-user-dto';
import { LoggedUserDTO } from '../../models/DTOs/requestDTO/loggedUserDTO/logged-user-dto'; 

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  token!:string
  isLogged = new BehaviorSubject<boolean>(false)
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
}
