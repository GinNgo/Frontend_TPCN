import { CheckOutComponent } from './component/check-out/check-out.component';
import { ContactComponent } from './component/contact/contact.component';
import { ProductAllComponent } from './component/product-all/product-all.component';
import { ProductBySearchComponent } from './component/product-by-search/product-by-search.component';
import { CustomerComponent } from './component/customer/customer.component';
import { AuthGuardService } from '../services/auth-guard.service';
import { ProductByPriceComponent } from './component/product-by-price/product-by-price.component';
import { ProductByCatComponent } from './component/product-by-cat/product-by-cat.component';
import { DetailComponent } from './component/detail/detail.component';
import { HeaderComponent } from './component/header/header.component';
import { HomeComponent } from './component/home/home.component';
import { UserComponent } from './user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './component/login/login.component';
import { RegisterComponent } from './component/register/register.component';
import { ShoppinpCartComponent } from './component/shoppinp-cart/shoppinp-cart.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: '',
    component: UserComponent,
    children: [
      {
        path: 'home',
        component: HomeComponent,
      },
      {
        path: 'header',
        component: HeaderComponent,
      },
      {
        path: 'chi-tiet/:productname/:id',
        component: DetailComponent,
      },
      { path: 'dang-nhap', component: LoginComponent },
      { path: 'dang-ky', component: RegisterComponent },
      { path: 'gio-hang', component: ShoppinpCartComponent },
      {
        path: 'san-pham-nhom/:CatName/:CatId',
        component: ProductByCatComponent,
      },
      {
        path: 'tat-ca-san-pham',
        component: ProductAllComponent,
      },

      {
        path: 'san-pham-giam-gia/:Percent',
        component: ProductByPriceComponent,
      },

      {
        path: 'tim-kiem/:ProductName',
        component: ProductBySearchComponent,
      },
      {
        path: 'thanh-toan',
        component: CheckOutComponent,
      },
      {
        path: 'thong-tin-chi-tiet',
        component: CustomerComponent,
      },
      {
        path: 'lien-he',
        component: ContactComponent,
      },

      { path: '**', redirectTo: '/404', pathMatch: 'full' },
    ],
  },
  { path: '404', component: PageNotFoundComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class UserRoutingModule {}
