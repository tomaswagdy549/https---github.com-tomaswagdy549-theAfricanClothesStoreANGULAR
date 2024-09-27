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
  constructor(private accountService: AccountService,private router:Router) {}
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
    this.accountService.login(this.loggedUserDto).subscribe({
      next: (response) => {
        response['message'].slice(29);
        document.getElementById("btn-close")?.click()
        this.router.navigateByUrl("/clothes")
      },
      error: (error) => this.message = error.error['message'],
    });
  }
}
