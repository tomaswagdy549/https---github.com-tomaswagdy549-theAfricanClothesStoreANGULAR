import { Component, OnChanges } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { LoadingSpinnerComponent } from './components/loadingSpinner/loading-spinner/loading-spinner.component';
import { AccountService } from './services/accountService/account.service';
import { OrderComponent } from './components/order/order.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    NavbarComponent,
    FooterComponent,
    HeaderComponent,
    LoadingSpinnerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'ecommerce';
  constructor(private accountService: AccountService) {
    if (localStorage.getItem('token') != null) {
      this.accountService.logUser();
      if (this.accountService.checkIfTokenExpired()) {
        this.accountService.logOut();
      }
    }
  }

  ngOnInit(): void {}
}
