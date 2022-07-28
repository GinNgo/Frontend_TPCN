import { AuthGuardService } from '../services/auth-guard.service';
import { LoginComponent } from './component/login/login.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { UserRoutingModule } from './user-routing.module';
import { UserComponent } from './user.component';
import { RegisterComponent } from './component/register/register.component';
import { CategoriesComponent } from './component/categories/categories.component';
import { FooterComponent } from './component/footer/footer.component';
import { ButtonScrollBottomComponent } from './component/button-scroll-bottom/button-scroll-bottom.component';
import { DetailComponent } from './component/detail/detail.component';
import { IntroductionComponent } from './component/detail/introduction/introduction.component';
import { ShoppinpCartComponent } from './component/shoppinp-cart/shoppinp-cart.component';

import { NgxSliderModule } from '@angular-slider/ngx-slider';
import { NgxPaginationModule } from 'ngx-pagination';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReviewsComponent } from './component/detail/reviews/reviews.component';
import { ProductByCatComponent } from './component/product-by-cat/product-by-cat.component';
import { ProductByPriceComponent } from './component/product-by-price/product-by-price.component';
import { JwtModule } from '@auth0/angular-jwt';
import { CustomerComponent } from './component/customer/customer.component';
import { ComboBoxComponent } from './component/combo-box/combo-box.component';
import { ProductBySearchComponent } from './component/product-by-search/product-by-search.component';
import { CookieService } from 'ngx-cookie-service';
import { ProductAllComponent } from './component/product-all/product-all.component';
import { ContactComponent } from './component/contact/contact.component';
import { CheckOutComponent } from './component/check-out/check-out.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';
import { NgToastModule } from 'ng-angular-popup';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export function tokenGetter() {
  return localStorage.getItem('jwt');
}
@NgModule({
  declarations: [
    UserComponent,
    HomeComponent,
    HeaderComponent,
    RegisterComponent,
    CategoriesComponent,
    FooterComponent,
    ButtonScrollBottomComponent,
    LoginComponent,
    DetailComponent,
    IntroductionComponent,
    ReviewsComponent,
    ShoppinpCartComponent,
    ProductByCatComponent,
    ProductByPriceComponent,
    CustomerComponent,
    ComboBoxComponent,
    ProductBySearchComponent,
    ProductAllComponent,
    ContactComponent,
    CheckOutComponent,
    PageNotFoundComponent,
  ],
  imports: [
    BrowserModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgxSliderModule,
    HttpClientModule,
    NgxPaginationModule,
    NgToastModule,
    BrowserAnimationsModule,

    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
        allowedDomains: ['localhost:44376'],
        disallowedRoutes: [],
      },
    }),
  ],
  providers: [AuthGuardService, CookieService],
})
export class UserModule {}
