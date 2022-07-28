import { CategoryEditComponent } from './component/category/category-edit/category-edit.component';
import { CategoryTrashComponent } from './component/category/category-trash/category-trash.component';
import { CategoryCreateComponent } from './component/category/category-create/category-create.component';
import { CategoryListComponent } from './component/category/category-list/category-list.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AdminRoutingModule } from './admin-routing.module';
import { NgxPaginationModule } from 'ngx-pagination';
import { EditorModule } from '@tinymce/tinymce-angular';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatDividerModule } from '@angular/material/divider';
import { MatCardModule } from '@angular/material/card';
import { NgToastModule } from 'ng-angular-popup';
import { AdminComponent } from './admin.component';

import { HeaderComponent } from './component/header/header.component';

import { ButtonScrollAdminComponent } from './component/button-scroll-bottom/button-scroll-bottom.component';
import { ComboboxComponent } from './component/combobox/combobox.component';
import { ProductListComponent } from './component/product/product-list/product-list.component';
import { ProductCreateComponent } from './component/product/product-create/product-create.component';
import { ProductEditComponent } from './component/product/product-edit/product-edit.component';
import { ProductTrashComponent } from './component/product/product-trash/product-trash.component';
import { BrandListComponent } from './component/brand/brand-list/brand-list.component';
import { BrandCreateComponent } from './component/brand/brand-create/brand-create.component';
import { BrandEditComponent } from './component/brand/brand-edit/brand-edit.component';
import { BrandTrashComponent } from './component/brand/brand-trash/brand-trash.component';

import { OrderListComponent } from './component/order/order-list/order-list.component';
import { BodyComponent } from './component/body/body.component';
import { SidenavComponent } from './component/sidenav/sidenav.component';
import { DashboardComponent } from './component/dashboard/dashboard.component';

import { ProfileComponent } from './component/profile/profile.component';
import { AreaComponent } from './widgets/area/area.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { FlexLayoutModule } from '@angular/flex-layout';
import { CardComponent } from './widgets/card/card.component';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { AreaPriceComponent } from './widgets/area-price/area-price.component';
import { FooterComponent } from './component/footer/footer.component';
import { ShortNumberPipe } from '../pipes/short-number.pipe';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { OrderDetailComponent } from './component/order/order-detail/order-detail.component';
import { AccountListComponent } from './component/account/account-list/account-list.component';
import { AccountCreateComponent } from './component/account/account-create/account-create.component';
import { AccountTrashComponent } from './component/account/account-trash/account-trash.component';
import { AccountEditComponent } from './component/account/account-edit/account-edit.component';
import { ComboboxBrandComponent } from './component/combobox-brand/combobox-brand.component';
import { ComboboxCategoryComponent } from './component/combobox-category/combobox-category.component';
import { ContactListComponent } from './component/contact-list/contact-list.component';
import { OrderComponent } from './component/order/order.component';
import { ComboboxOrderComponent } from './component/combobox-order/combobox-order.component';

@NgModule({
  declarations: [
    AdminComponent,

    HeaderComponent,
    ButtonScrollAdminComponent,
    ComboboxComponent,
    ProductListComponent,
    ProductCreateComponent,
    ProductEditComponent,
    ProductTrashComponent,
    BrandListComponent,
    BrandCreateComponent,
    BrandEditComponent,
    BrandTrashComponent,

    OrderListComponent,
    BodyComponent,
    CategoryListComponent,
    CategoryCreateComponent,
    CategoryTrashComponent,
    CategoryEditComponent,
    SidenavComponent,
    DashboardComponent,

    ProfileComponent,
    AreaComponent,
    CardComponent,
    AreaPriceComponent,
    FooterComponent,
    ShortNumberPipe,
    OrderDetailComponent,
    AccountListComponent,
    AccountCreateComponent,
    AccountTrashComponent,
    AccountEditComponent,
    ComboboxBrandComponent,
    ComboboxCategoryComponent,
    ContactListComponent,
    OrderComponent,
    ComboboxOrderComponent,
  ],
  imports: [
    BrowserModule,
    AdminRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    EditorModule,
    NgxPaginationModule,
    BrowserAnimationsModule,
    MatDividerModule,
    HighchartsChartModule,
    FlexLayoutModule,
    MatCardModule,
    MatIconModule,
    MatPaginatorModule,
    MatTableModule,
    NgToastModule,
    MatSelectModule,
    MatInputModule,
    MatFormFieldModule,
    NgMultiSelectDropDownModule.forRoot(),
  ],
  providers: [],
})
export class AdminModule {}
