import { Component } from '@angular/core';
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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RegisterComponent, CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loggedUserDto!: LoggedUserDTO;
  message!: string;
  constructor(
    private accountService: AccountService,
    private globalDateService: GlobalDataService,
    private router: Router
  ) {}
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
    if (this.loginForm.valid) {
      this.login();
    }
  }
  login() {
    this.loggedUserDto = {
      email: this.loginForm.value.email!,
      password: this.loginForm.value.password!,
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
          this.router.navigateByUrl('/clothes');
        },
        error: (error) => (this.message = error.error['message']),
      });
  }
  goToRegister(): void {
    document.getElementById('btn-close')?.click()
    this.router.navigateByUrl('/register');
  }

}
