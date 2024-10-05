import { Component, AfterViewInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { LoginComponent } from '../login/login.component';
import { AccountService } from '../../services/accountService/account.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterModule, LoginComponent,CommonModule],
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
  logged: boolean = false;
  constructor(private accountService: AccountService) {
    this.accountService.isLogged.subscribe({
      next: (value) => {
        this.logged = value; 
      },
    });
  }
}
