import { ContactComponent } from './../user/component/contact/contact.component';
import { AccountTrashComponent } from './component/account/account-trash/account-trash.component';
import { AccountCreateComponent } from './component/account/account-create/account-create.component';
import { AccountEditComponent } from './component/account/account-edit/account-edit.component';
import { AccountListComponent } from './component/account/account-list/account-list.component';
import { OrderListComponent } from './component/order/order-list/order-list.component';
import { CategoryCreateComponent } from './component/category/category-create/category-create.component';
import { CategoryListComponent } from './component/category/category-list/category-list.component';
import { ProfileComponent } from './component/profile/profile.component';

import { DashboardComponent } from './component/dashboard/dashboard.component';
import { BrandTrashComponent } from './component/brand/brand-trash/brand-trash.component';
import { BrandCreateComponent } from './component/brand/brand-create/brand-create.component';
import { BrandEditComponent } from './component/brand/brand-edit/brand-edit.component';
import { BrandListComponent } from './component/brand/brand-list/brand-list.component';
import { ProductTrashComponent } from './component/product/product-trash/product-trash.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { ProductEditComponent } from './component/product/product-edit/product-edit.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';

import { AdminComponent } from './admin.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategoryEditComponent } from './component/category/category-edit/category-edit.component';
import { CategoryTrashComponent } from './component/category/category-trash/category-trash.component';
import { OrderDetailComponent } from './component/order/order-detail/order-detail.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { PageNotFoundComponent } from '../page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'admin',
    component: AdminComponent,
    children: [
      {
        path: 'product',
        children: [
          {
            path: 'list',
            component: ProductListComponent,
          },
          {
            path: 'edit/:productId',
            component: ProductEditComponent,
          },
          {
            path: 'create',
            component: ProductCreateComponent,
          },
          {
            path: 'trash',
            component: ProductTrashComponent,
          },
        ],
      },
      {
        path: 'brand',
        children: [
          {
            path: 'list',
            component: BrandListComponent,
          },
          {
            path: 'edit/:brandId',
            component: BrandEditComponent,
          },
          {
            path: 'create',
            component: BrandCreateComponent,
          },
          {
            path: 'trash',
            component: BrandTrashComponent,
          },
        ],
      },
      {
        path: 'category',
        children: [
          {
            path: 'list',
            component: CategoryListComponent,
          },
          {
            path: 'edit/:catId',
            component: CategoryEditComponent,
          },
          {
            path: 'create',
            component: CategoryCreateComponent,
          },
          {
            path: 'trash',
            component: CategoryTrashComponent,
          },
        ],
      },
      {
        path: 'order',
        children: [
          {
            path: 'list',
            component: OrderListComponent,
          },
          {
            path: 'detail/:orderId',
            component: OrderDetailComponent,
          },
        ],
      },
      {
        path: 'account',
        children: [
          {
            path: 'list',
            component: AccountListComponent,
          },
          {
            path: 'edit/:accId',
            component: AccountEditComponent,
          },
          {
            path: 'create',
            component: AccountCreateComponent,
          },
          {
            path: 'trash',
            component: AccountTrashComponent,
          },
        ],
      },
      { path: 'profile', component: ProfileComponent },
      { path: 'contact', component: ContactListComponent },
      { path: 'dashboard', component: DashboardComponent },
      { path: '404', component: PageNotFoundComponent },
      { path: '**', redirectTo: '/404', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
