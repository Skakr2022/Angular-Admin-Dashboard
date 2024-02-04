import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfirmMailComponent } from './components/authentication/confirm-mail/confirm-mail.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { LockScreenComponent } from './components/authentication/lock-screen/lock-screen.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { SigninSignupComponent } from './components/authentication/signin-signup/signin-signup.component';
import { InternalErrorComponent } from './components/common/internal-error/internal-error.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { EcommerceComponent } from './components/dashboard/ecommerce/ecommerce.component';
import { AccountComponent } from './components/pages/account/account.component';
import { ConnectionsComponent } from './components/pages/connections/connections.component';
import { CreateProductComponent } from './components/pages/ecommerce/create-product/create-product.component';
import { ProductDetailsComponent } from './components/pages/ecommerce/product-details/product-details.component';
import { ProductSellersComponent } from './components/pages/ecommerce/product-sellers/product-sellers.component';
import { ProductsCartComponent } from './components/pages/ecommerce/products-cart/products-cart.component';
import { ProductsCheckoutComponent } from './components/pages/ecommerce/products-checkout/products-checkout.component';
import { UsersComponent } from './components/pages/ecommerce/users/users.component';
import { ProductsOrderDetailsComponent } from './components/pages/ecommerce/products-order-details/products-order-details.component';
import { ProductsOrdersComponent } from './components/pages/ecommerce/products-orders/products-orders.component';
import { ProductsComponent } from './components/pages/ecommerce/products/products.component';
import { PrivacyPolicyComponent } from './components/pages/privacy-policy/privacy-policy.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { SecurityComponent } from './components/pages/security/security.component';
import { TermsConditionsComponent } from './components/pages/terms-conditions/terms-conditions.component';
import { authGuardGuard, loginGuard } from './components/core/Guards/Auth-guard.guard';
import { CategoryComponent } from './components/pages/ecommerce/category/category.component';

const routes: Routes = [
    { 
        path: '', 
        redirectTo: 'ecommerce', 
        pathMatch: 'full' 
      },
    { path:'ecommerce',
      // canActivateChild:[authGuardGuard],
      children: [
        { path: '', component: EcommerceComponent },
        { path: 'products', component: ProductsComponent },
        { path: 'product-details', component: ProductDetailsComponent },
        { path: 'create', component: CreateProductComponent },
        { path: 'orders', component: ProductsOrdersComponent },
        { path: 'order-details', component: ProductsOrderDetailsComponent },
        { path: 'customers', component: UsersComponent },
        { path: 'cart', component: ProductsCartComponent },
        { path: 'checkout', component: ProductsCheckoutComponent },
        { path: 'sellers', component: ProductSellersComponent },
        { path: 'profile', component: ProfileComponent},
        { path: 'account', component: AccountComponent},
        { path: 'security', component: SecurityComponent},
        { path: 'connections', component: ConnectionsComponent},
        { path: 'privacy-policy', component: PrivacyPolicyComponent},
        { path: 'terms-conditions', component: TermsConditionsComponent},
        { path: 'category', component: CategoryComponent},
    ]},
    
    {path: 'error-500', component: InternalErrorComponent},
    {path: 'authentication/forgot-password', component: ForgotPasswordComponent},
    {path: 'authentication/reset-password', component: ResetPasswordComponent},
    {path: 'authentication/login',
    //  canActivate:[loginGuard],
     component: LoginComponent
    },
    {path: 'authentication/register', component: RegisterComponent},
    {path: 'authentication/signin-signup', component: SigninSignupComponent},
    {path: 'authentication/logout', component: LogoutComponent},
    {path: 'authentication/confirm-mail', component: ConfirmMailComponent},
    {path: 'authentication/lock-screen', component: LockScreenComponent},
    // Here add new pages component

    {path: '**', component: NotFoundComponent} // This line will remain down from the whole pages component list
];

@NgModule({
    imports: [RouterModule.forRoot(routes, { scrollPositionRestoration: 'enabled' })],
    exports: [RouterModule]
})
export class AppRoutingModule { }