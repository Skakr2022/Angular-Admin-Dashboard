import { NgModule } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { MatMenuModule } from '@angular/material/menu';
import { FullCalendarModule } from '@fullcalendar/angular';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { NgxEditorModule } from 'ngx-editor';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { MatCardModule } from '@angular/material/card';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { NgApexchartsModule } from "ng-apexcharts";
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatBadgeModule } from '@angular/material/badge';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatChipsModule } from '@angular/material/chips';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { MatDividerModule } from '@angular/material/divider';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatListModule } from '@angular/material/list';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatRippleModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatSliderModule } from '@angular/material/slider';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatStepperModule } from '@angular/material/stepper';
import { MatTabsModule } from '@angular/material/tabs';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatTreeModule } from '@angular/material/tree';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { CdkAccordionModule } from '@angular/cdk/accordion';
import { NgxEchartsModule } from 'ngx-echarts';
import { NgxGaugeModule } from 'ngx-gauge';
import { NgChartsModule } from 'ng2-charts';
import { NgxMatTimepickerModule } from 'ngx-mat-timepicker';
import { QuillModule } from 'ngx-quill';
import { NgxDropzoneModule } from 'ngx-dropzone';
import { ColorPickerModule } from 'ngx-color-picker';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EcommerceComponent } from './components/dashboard/ecommerce/ecommerce.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SidebarComponent } from './components/common/sidebar/sidebar.component';
import { FooterComponent } from './components/common/footer/footer.component';
import { HeaderComponent } from './components/common/header/header.component';
import { RecentOrdersComponent } from './components/dashboard/ecommerce/recent-orders/recent-orders.component';
import { TeamMembersListComponent } from './components/dashboard/ecommerce/team-members-list/team-members-list.component';
import { BestSellingProductsComponent } from './components/dashboard/ecommerce/best-selling-products/best-selling-products.component';
import { EcommerceStatsComponent } from './components/dashboard/ecommerce/ecommerce-stats/ecommerce-stats.component';
import { AudienceOverviewComponent } from './components/dashboard/ecommerce/audience-overview/audience-overview.component';
import { EcommerceRatingsComponent } from './components/dashboard/ecommerce/ecommerce-ratings/ecommerce-ratings.component';
import { VisitsByDayComponent } from './components/dashboard/ecommerce/visits-by-day/visits-by-day.component';
import { NewCustomersComponent } from './components/dashboard/ecommerce/new-customers/new-customers.component';
import { RevenueStatusComponent } from './components/dashboard/ecommerce/revenue-status/revenue-status.component';
import { ProductsComponent } from './components/pages/ecommerce/products/products.component';
import { ProductDetailsComponent } from './components/home/product-details/product-details.component';
import { CreateProductComponent } from './components/pages/ecommerce/create-product/create-product.component';
import { ProductsOrderDetailsComponent } from './components/pages/ecommerce/products-order-details/products-order-details.component';
import { ProductsOrdersComponent } from './components/pages/ecommerce/products-orders/products-orders.component';
import { UsersComponent } from './components/pages/ecommerce/users/users.component';
import { ProductsCartComponent } from './components/pages/ecommerce/products-cart/products-cart.component';
import { ProductSellersComponent } from './components/pages/ecommerce/product-sellers/product-sellers.component';
import { ProfileComponent } from './components/pages/profile/profile.component';
import { AccountComponent } from './components/pages/account/account.component';
import { NotFoundComponent } from './components/common/not-found/not-found.component';
import { InternalErrorComponent } from './components/common/internal-error/internal-error.component';
import { ResetPasswordComponent } from './components/authentication/reset-password/reset-password.component';
import { ForgotPasswordComponent } from './components/authentication/forgot-password/forgot-password.component';
import { LoginComponent } from './components/authentication/login/login.component';
import { RegisterComponent } from './components/authentication/register/register.component';
import { SigninSignupComponent } from './components/authentication/signin-signup/signin-signup.component';
import { LogoutComponent } from './components/authentication/logout/logout.component';
import { ConfirmMailComponent } from './components/authentication/confirm-mail/confirm-mail.component';
import { LockScreenComponent } from './components/authentication/lock-screen/lock-screen.component';
import { CustomizerSettingsComponent } from './components/customizer-settings/customizer-settings.component';
import { TableComponent } from './components/shared/components/table/table.component';
import { CategoryComponent } from './components/pages/ecommerce/category/category.component';
import { ApiService } from './components/core/services/api.service';
import { EditCreateDialogComponent } from './components/shared/components/edit-create-dialog/edit-create-dialog.component';
import { CategoryDialogComponent } from './components/shared/components/category-dialog/category-dialog.component';
import { httpInterceptorProviders } from './components/core/interceptors/auth.interceptor';
import { ChangeRoleComponent } from './components/shared/components/change-role/change-role.component';
import { RoleTransformPipe } from './components/core/pipes/role-transform.pipe';
import { SnackBarComponent } from './components/shared/components/snack-bar/snack-bar.component';
import { OrderDialogComponent } from './components/shared/components/order-dialog/order-dialog.component';
import { TranslateLoader,TranslateModule } from '@ngx-translate/core'
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { HomeComponent } from './components/home/home.component';
import { HomeHeaderComponent } from './components/home/common/home-header/home-header.component';
import { HomeFooterComponent } from './components/home/common/home-footer/home-footer.component';
import { CheckoutComponent } from './components/home/checkout/checkout.component';
import { HomeMainPageComponent } from './components/home/home-main-page/home-main-page.component';
import { SliderComponent } from './components/home/home-main-page/slider/slider.component';
import { MoreProductsComponent } from './components/home/home-main-page/more-products/more-products.component';
import { HotDealsProductComponent } from './components/home/home-main-page/hot-deals-product/hot-deals-product.component';
import { LatestProductComponent } from './components/home/home-main-page/latest-product/latest-product.component';
import { CartComponent } from './components/home/common/home-header/cart/cart.component';
import { ProductCategoryListComponent } from './components/home/product-category-list/product-category-list.component';

// import { CarouselModule } from 'primeng/carousel';

export function HttpLoaderFactory(http:HttpClient) {
    return new TranslateHttpLoader(http,'./assets/i18n/','.json');
}
@NgModule({
    declarations: [
        AppComponent,
        DashboardComponent,
        EcommerceComponent,
        SidebarComponent,
        FooterComponent,
        HeaderComponent,
        RecentOrdersComponent,
        TeamMembersListComponent,
        BestSellingProductsComponent,
        EcommerceStatsComponent,
        AudienceOverviewComponent,
        EcommerceRatingsComponent,
        VisitsByDayComponent,
        NewCustomersComponent,
        RevenueStatusComponent,
        RoleTransformPipe,
        ProductsComponent,
        ProductDetailsComponent,
        CreateProductComponent,
        ProductsOrderDetailsComponent,
        ProductsOrdersComponent,
        UsersComponent,
        ProductsCartComponent,
        CheckoutComponent,
        ProductSellersComponent,
        ProfileComponent,
        AccountComponent,
        NotFoundComponent,
        InternalErrorComponent,
        ResetPasswordComponent,
        ForgotPasswordComponent,
        LoginComponent,
        RegisterComponent,
        SigninSignupComponent,
        LogoutComponent,
        ConfirmMailComponent,
        LockScreenComponent,
        CustomizerSettingsComponent,
        TableComponent,
        CategoryComponent,
        EditCreateDialogComponent,
        CategoryDialogComponent,
        ChangeRoleComponent,
        SnackBarComponent,
        OrderDialogComponent,
        HomeComponent,
        HomeHeaderComponent,
        HomeFooterComponent,
        CheckoutComponent,
        HomeMainPageComponent,
        SliderComponent,
        MoreProductsComponent,
        HotDealsProductComponent,
        LatestProductComponent,
        CartComponent,
        ProductCategoryListComponent,
        
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        MatMenuModule,
        MatCardModule,
        MatTableModule,
        MatPaginatorModule,
        BrowserAnimationsModule,
        NgApexchartsModule,
        MatProgressBarModule,
        MatButtonModule,
        MatAutocompleteModule,
        MatBadgeModule,
        MatBottomSheetModule,
        MatButtonToggleModule,
        MatCheckboxModule,
        MatChipsModule,
        MatDatepickerModule,
        MatDialogModule,
        MatDividerModule,
        MatExpansionModule,
        MatFormFieldModule,
        MatGridListModule,
        MatIconModule,
        MatInputModule,
        MatListModule,
        MatProgressSpinnerModule,
        MatRadioModule,
        MatRippleModule,
        MatSelectModule,
        MatSidenavModule,
        MatSlideToggleModule,
        MatSliderModule,
        MatSnackBarModule,
        MatSortModule,
        MatStepperModule,
        MatTabsModule,
        MatToolbarModule,
        MatTooltipModule,
        MatTreeModule,
        NgScrollbarModule,
        FormsModule,
        FullCalendarModule,
        MatNativeDateModule ,
        ReactiveFormsModule,
        CarouselModule,
        NgxEditorModule,
        DragDropModule,
        HttpClientModule,
        CarouselModule,
        CdkAccordionModule,
        NgxEchartsModule.forRoot({
            echarts: () => import('echarts')
        }),
        NgxGaugeModule,
        NgChartsModule,
        NgxMatTimepickerModule,
        QuillModule.forRoot(),
        NgxDropzoneModule,
        ColorPickerModule,
        TranslateModule.forRoot({
            loader:{
                provide:TranslateLoader,
                useFactory: HttpLoaderFactory,
                deps:[HttpClient]
            }
        })
    ],
    providers: [
        DatePipe,
        ApiService,
        TableComponent,
        SnackBarComponent,
        httpInterceptorProviders
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }  