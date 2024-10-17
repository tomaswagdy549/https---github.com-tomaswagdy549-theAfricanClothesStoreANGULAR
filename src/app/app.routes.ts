import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ReturnRefundPolicyComponent } from './components/return-refund-policy/return-refund-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { productResolver } from './guards/resolveGuard/product.guard';
import { femaleResolverGuard } from './guards/femaleResolver/female-resolver.guard';
import { OrderComponent } from './components/order/order.component';
import { AddingProductComponent } from './components/adding-product/adding-product.component';
import { EditingProductComponent } from './components/editing-product/editing-product.component';
import { RegisterComponent } from './components/register/register.component';
import { isLoggedGuard } from './guards/guards/isLogged/is-logged.guard';
import { isAdminGuard } from './guards/guards/isAdmin/is-admin.guard';
import { isLoggedOutGuard } from './guards/guards/isLoggedOut/is-logged-out.guard';
import { filteredProductsComponent } from './components/filteredProducts/filteredProducts.component';
import { womenShoesResolver } from './guards/womenShoes/women-shoes.guard';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { EditBrandComponent } from './components/edit-brand/edit-brand.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [isLoggedGuard] },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'return-refund-policy', component: ReturnRefundPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'clothes', component: ClothesComponent },
  { path: '', component: HeaderComponent },
  {
    path: 'shoes',
    component: filteredProductsComponent,
    resolve: { products: womenShoesResolver },
  },
  {
    path: 'men',
    component: filteredProductsComponent,
    resolve: { products: productResolver },
  },
  {
    path: 'women',
    component: filteredProductsComponent,
    resolve: { products: femaleResolverGuard },
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [isLoggedGuard],
  },
  {
    path: 'AddAdmin',
    component: RegisterComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'bagsmen',
    component: filteredProductsComponent,
    resolve: { products: womenShoesResolver },
  },
  {
    path: 'accessors',
    component: filteredProductsComponent,
    resolve: { products: womenShoesResolver },
  },
  {
    path: 'socks',
    component: filteredProductsComponent,
    resolve: { products: womenShoesResolver },
  },
  {
    path: 'belts',
    component: filteredProductsComponent,
    resolve: { products: womenShoesResolver },
  },
  {
    path: 'womenshoes',
    component: filteredProductsComponent,
    resolve: { products: womenShoesResolver },
  },
  {
    path: 'womenbags',
    component: filteredProductsComponent,
    resolve: { products: femaleResolverGuard },
  },
  {
    path: 'shoppingcart',
    component: ShoppingcartComponent,
    canActivate: [isLoggedOutGuard],
  },
  { path: 'order', component: OrderComponent, canActivate: [isLoggedOutGuard] },
  {
    path: 'addingproduct',
    component: AddingProductComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'editingproduct/:id',
    component: EditingProductComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'editingCategory',
    component: EditCategoryComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'editingBrand',
    component: EditBrandComponent,
    canActivate: [isAdminGuard],
  },
  { path: 'addcategory', component: AddCategoryComponent },
  { path: 'addbrand', component: AddBrandComponent },

  { path: '**', redirectTo: '' },
];
