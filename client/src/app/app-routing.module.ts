import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import {LoginComponent} from "./views/public/login/login.component";
import {RegisterComponent} from "./views/public/register/register.component";
import {UsersComponent} from "./views/secrets/users/users.component";
import {NoAuthGuardService} from "./core/guards/no-auth.guard";
import {AuthGuardService} from "./core/guards/auth.guard";


const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: LoginComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'register',
    component: RegisterComponent,
    canActivate: [NoAuthGuardService]
  },
  {
    path: 'users',
    component: UsersComponent,
    canActivate: [AuthGuardService]
  }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
