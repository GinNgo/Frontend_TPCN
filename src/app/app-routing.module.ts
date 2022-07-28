import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './user/component/home/home.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/user',
  //   pathMatch: 'full',
  // },
  // {
  //   path: '',
  //   redirectTo: '/admin',
  //   pathMatch: 'full',
  // },
  {
    path: '',
    component: UserComponent,
    children: [{ path: '', component: HomeComponent }],
  },
  {
    path: 'admin',

    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
