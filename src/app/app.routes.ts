import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { ReturnRefundPolicyComponent } from './components/return-refund-policy/return-refund-policy.component';
import { TermsOfServiceComponent } from './components/terms-of-service/terms-of-service.component';
import { ClothesComponent } from './components/clothes/clothes.component';
import { ShoppingcartComponent } from './components/shoppingcart/shoppingcart.component';
import { OrderComponent } from './components/order/order.component';
import { AddingProductComponent } from './components/adding-product/adding-product.component';
import { EditingProductComponent } from './components/editing-product/editing-product.component';
import { RegisterComponent } from './components/register/register.component';
import { isLoggedGuard } from './guards/guards/isLogged/is-logged.guard';
import { isAdminGuard } from './guards/guards/isAdmin/is-admin.guard';
import { isLoggedOutGuard } from './guards/guards/isLoggedOut/is-logged-out.guard';
import { filteredProductsComponent } from './components/filteredProducts/filteredProducts.component';
import { EditCategoryComponent } from './components/edit-category/edit-category.component';
import { EditBrandComponent } from './components/edit-brand/edit-brand.component';
import { AddCategoryComponent } from './components/add-category/add-category.component';
import { AddBrandComponent } from './components/add-brand/add-brand.component';
import { AddSubCategoryComponent } from './components/add-sub-category/add-sub-category.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { NewOneComponent } from './components/new-one/new-one.component';
import { AddDiscountComponent } from './components/add-discount/add-discount.component';
import { SortedProductsComponent } from './components/sorted-products/sorted-products.component';
import { AddCouponComponent } from './components/add-coupon/add-coupon.component';
import { ConfirmOrderComponent } from './components/confirm-order/confirm-order.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, canActivate: [isLoggedGuard] },
  { path: 'AboutUs', component: AboutUsComponent },
  { path: 'return-refund-policy', component: ReturnRefundPolicyComponent },
  { path: 'terms-of-service', component: TermsOfServiceComponent },
  { path: 'clothes', component: ClothesComponent },
  { path: '', component: HeaderComponent },
  {
    path: 'filteredProducts/:searchQuery',
    component: filteredProductsComponent,
  },
  {
    path: 'sortedProducts/:searchQuery',
    component: SortedProductsComponent,
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
    path: 'shoppingcart',
    component: ShoppingcartComponent,
    canActivate: [isLoggedOutGuard],
  },
  {
    path: 'not-found',
    component: NotFoundComponent,
    canActivate: [isLoggedOutGuard]
  },
  {
    path: 'new-component',
    component: NewOneComponent,
    canActivate: [isLoggedOutGuard]
  },
  {
    path: 'add-discount',
    component: AddDiscountComponent,
    canActivate: [isAdminGuard]
  },
  {
    path: 'editingSubCategory',
    component: AddSubCategoryComponent,
    canActivate: [isAdminGuard],
  },
  
  {
    path: 'confirmOrder/:orderDetails',
    component: ConfirmOrderComponent,
    canActivate: [isAdminGuard],
  },
  {
    path: 'add-coupon',
    component: AddCouponComponent,
    canActivate: [isAdminGuard],
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
