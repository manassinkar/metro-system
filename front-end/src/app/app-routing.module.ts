import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { AdminComponent } from './admin/admin.component';
import { UserComponent } from './user/user.component';
import { AddCouponComponent } from './add-coupon/add-coupon.component';
import { AddRouteComponent } from './add-route/add-route.component';
import { ViewCouponsComponent } from './view-coupons/view-coupons.component';
import { ViewRoutesComponent } from './view-routes/view-routes.component';


const routes: Routes = [
    {
      path: 'login',
      redirectTo: 'login',
      pathMatch: 'full'
    },
    {
      path: 'login',
      component: LoginComponent
    },
    {
      path: 'register',
      component: RegisterComponent
    },
    {
      path: 'admin',
      component: AdminComponent
    },
    {
      path: 'user',
      component: UserComponent
    },
    {
      path: 'addCoupon',
      component: AddCouponComponent
    },
    {
      path: 'addRoute',
      component: AddRouteComponent
    },
    {
      path: 'viewCoupons',
      component: ViewCouponsComponent
    },
    {
      path: 'viewRoutes',
      component: ViewRoutesComponent
    },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
