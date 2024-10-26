import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { LoginComponent } from '../login/login.component';
import { AccountService } from '../../services/accountService/account.service';
import { RegisteredUserDTO } from '../../models/DTOs/requestDTO/registeredUserDTO/registered-user-dto';
import { Router } from '@angular/router';
import { HandleResponse } from '../../handlingResponse/handle-response';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, LoginComponent],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerUserDTO!: RegisteredUserDTO;
  constructor(private accountService: AccountService, private router: Router) {}
  registerForm = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    address: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
    ]),
    phoneNumber: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\d+$/),
    ]),
    userName: new FormControl('', [
      Validators.required,
      Validators.pattern(/^[a-zA-Z0-9]{6,}$/),
    ]),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.pattern(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/
      ),
    ]),
    role: new FormControl('', Validators.required),
  });
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Submit form data to the server
    }
  }

  // Helper method to get form controls
  get f() {
    return this.registerForm.controls;
  }
  register() {
    this.registerUserDTO = {
      firstName: this.registerForm.get('firstName')?.value!,
      lastName: this.registerForm.get('lastName')?.value!,
      address: this.registerForm.get('address')?.value!,
      phoneNumber: this.registerForm.get('phoneNumber')?.value!,
      userName: this.registerForm.get('userName')?.value!,
      email: this.registerForm.get('email')?.value!,
      password: this.registerForm.get('password')?.value!,
      role: 'Client',
    };
    this.accountService.register(this.registerUserDTO).subscribe({
      next: (response) => {
        HandleResponse.handleSuccess('registerd successfully');
        this.login();
      },
      error: (error) => console.error(error),
    });
  }
  login() {
    let loggedUserDto = {
      gmail: this.registerForm.get('email')?.value!,
    };
    this.accountService.login(loggedUserDto).subscribe({
      next: (response) => {
        localStorage.setItem('token', response['token']);
        this.accountService.logUser();
        this.router.navigateByUrl('/');
      },
      error: (error) => {
        console.error(error);
      },
    });
  }
}
