import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminLayoutComponent } from './Layout/admin-layout/admin-layout.component';
import { FrontLayoutComponent } from './Layout/front-layout/front-layout.component';
import { LoginLayoutComponent } from './Layout/login-layout/login-layout.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'admin/dashboard',
    pathMatch: 'full',
  }, {
    path: 'admin',
    component: AdminLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./Layout/admin-layout/admin-layout.module').then(m => m.AdminLayoutModule)
    }]
  }, {
    path: '',
    component: FrontLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./Layout/front-layout/front-layout.module').then(m => m.FrontLayoutModule)
    }]
  }, {
    path: 'admin-login',
    component: LoginLayoutComponent,
    children: [{
      path: '',
      loadChildren: () => import('./Layout/login-layout/login-layout.module').then(m => m.LoginLayoutModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
