import { Component, OnInit } from '@angular/core';
import {
  ReactiveFormsModule,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/accountService/account.service';
import { LoggedUserDTO } from '../../models/DTOs/requestDTO/loggedUserDTO/logged-user-dto';
import { Router } from '@angular/router';
import { GlobalDataService } from '../../services/globalService/global-data.service';
import { finalize } from 'rxjs';
import { HandleResponse } from '../../handlingResponse/handle-response';
import {
  GoogleSigninButtonModule,
  SocialAuthService,
  SocialUser,
} from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, GoogleSigninButtonModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loggedUserDto!: LoggedUserDTO;
  message!: string;
  constructor(
    private accountService: AccountService,
    private globalDateService: GlobalDataService,
    private router: Router,
    private socialAuthService: SocialAuthService
  ) {}
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe({
      next: (user) => {
        this.login(user);
      },
    });
  }

  onSubmit(): void {}
  login(user: SocialUser) {
    this.loggedUserDto = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      name: user.name,
    };
    this.globalDateService.apiCallSubject.next(true);
    this.accountService
      .login(this.loggedUserDto)
      .pipe(
        finalize(() => {
          this.globalDateService.apiCallSubject.next(false);
        })
      )
      .subscribe({
        next: (response) => {
          document.getElementById('btn-close')?.click();
          localStorage.setItem('token', response['token']);
          this.accountService.logUser();
          HandleResponse.handleSuccess('Logged succesfully');
          this.router.navigateByUrl('/clothes');
          location.reload();
        },
      });
  }
}
