import { AuthGuard } from './login/auth.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VehiclesComponent } from './vehicles/vehicles.component';
import { LoginRoutes } from './login/auth-routing.module';
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'vehicles',
    component: VehiclesComponent,
    // canActivate: [AuthGuard],
    // data: {
    //   role: 'USER, ADMIN'
    // }
  },
  ...LoginRoutes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
