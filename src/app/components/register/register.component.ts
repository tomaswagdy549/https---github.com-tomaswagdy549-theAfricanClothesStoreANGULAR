import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {
  registerForm = new FormGroup({
    firstName: new FormControl('', [Validators.required, Validators.minLength(3)]) ,
    lastName: new FormControl('', [Validators.required, Validators.minLength(3)]),
    address: new FormControl('', [Validators.required, Validators.minLength(5)]),
    phoneNumber: new FormControl('', [Validators.required, Validators.pattern(/^\d+$/)]),
    userName: new FormControl('', [Validators.required, Validators.pattern(/^[a-zA-Z0-9]{6,}$/)]),
    email:new FormControl('', [Validators.required, Validators.email]),
    password:new FormControl('', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#])[A-Za-z\d@$!%*?&#]{10,}$/)]),
    role:new FormControl('', Validators.required)
  });
  onSubmit() {
    if (this.registerForm.valid) {
      console.log(this.registerForm.value);
      // Submit form data to the server
    } else {
      // Handle form validation errors
      console.log("Form is invalid");
    }
  }

  // Helper method to get form controls
  get f() {
    return this.registerForm.controls;
  }
}
