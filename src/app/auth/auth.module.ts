import { Component, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes} from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { RegisterComponent } from './Components/register/register.component';
import { LogInComponent } from './Components/log-in/log-in.component';
import { ResetPasswordComponent } from './Components/reset-password/reset-password.component';
import { ForgetPasswordComponent } from './Components/forget-password/forget-password.component';
import { ChangePasswordComponent } from './Components/change-password/change-password.component';
import { AuthLayoutComponent } from './Components/auth-layout/auth-layout.component';

const routes: Routes = [
  {path:'' , component : AuthLayoutComponent , children:[
    {path : '' , redirectTo : 'LogIn' , pathMatch: 'full'},
    {path : 'Register' , component : RegisterComponent},
    {path : 'LogIn' , component : LogInComponent},
    {path : 'ForgetPassword' , component : ForgetPasswordComponent},
    {path : 'ChangePassword' , component : ChangePasswordComponent},
    {path : 'ResetPassword' , component : ResetPasswordComponent}
    ]}

];

@NgModule({
  declarations: [
   RegisterComponent,
   LogInComponent,
   ResetPasswordComponent,
   ForgetPasswordComponent,
   ChangePasswordComponent,
   AuthLayoutComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes),
]
})
export class AuthModule { }
