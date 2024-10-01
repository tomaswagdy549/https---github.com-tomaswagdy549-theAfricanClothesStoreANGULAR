import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ReturnRefundPolicyComponent } from './components/return-refund-policy/return-refund-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { ShoesComponent } from './components/shoes/shoes.component';
import { MenComponent } from './components/men/men.component';
import { BagsmenComponent } from './components/bagsmen/bagsmen.component';
import { AccessorsComponent } from './components/accessors/accessors.component';
import { SocksComponent } from './components/socks/socks.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'return-refund-policy', component: ReturnRefundPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'clothes', component: ClothesComponent },
  { path: '', component: HeaderComponent },
  {path:'shoes',component:ShoesComponent},
  {path:'men',component:MenComponent},
  {path:'bagsmen',component:BagsmenComponent},
  {path:'accessors',component:AccessorsComponent},
  {path:'socks',component:SocksComponent},
  { path: '**', redirectTo: '' }
];
