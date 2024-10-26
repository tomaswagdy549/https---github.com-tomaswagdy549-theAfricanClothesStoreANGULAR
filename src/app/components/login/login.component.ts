import { Component, OnInit } from '@angular/core';
import { RegisterComponent } from '../register/register.component';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AccountService } from '../../services/accountService/account.service';
import { LoggedUserDTO } from '../../models/DTOs/requestDTO/loggedUserDTO/logged-user-dto';
import { Router } from '@angular/router';
import { GlobalDataService } from '../../services/globalService/global-data.service';
import { finalize } from 'rxjs';
import { HandleResponse } from '../../handlingResponse/handle-response';
import { GoogleSigninButtonModule, SocialAuthService } from '@abacritt/angularx-social-login';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, CommonModule, ReactiveFormsModule,GoogleSigninButtonModule],
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
    private socialAuthService:SocialAuthService
  ) {}
  ngOnInit(): void {
    this.socialAuthService.authState.subscribe({
      next: (user) => {
        console.log(user);
        this.login(user)
      },
      error: (error) => {
        console.error(error);
      }
    })
  }
  loginForm = new FormGroup({
    email: new FormControl<string>('', [Validators.required, Validators.email]),
    password: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });
  get f() {
    return this.loginForm.controls;
  }

  onSubmit(): void {
    // if (this.loginForm.valid) {
    //   this.login();
    // }
  }
  login(user:any) {
    this.loggedUserDto = {
      gmail: user.email
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
        },
        error: (error) => (this.message = error.error['message']),
      });
  }
  goToRegister(): void {
    document.getElementById('btn-close')?.click();
    this.router.navigateByUrl('/register');
  }
}
