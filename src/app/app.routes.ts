import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';

export const routes: Routes = [
{ path: 'login', component: LoginComponent },
 
 { path: '', component: HeaderComponent }, 
 { path: '**', redirectTo: '' } // Redirect any unknown paths to home
];