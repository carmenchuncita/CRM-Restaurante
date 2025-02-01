import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { authGuard } from './guards/auth.guard';
import { ProfileComponent } from './components/profile/profile.component';
import { UpdatePasswordComponent } from './components/update-password/update-password.component';



export const AUTH_ROUTES: Routes = [

{
    path: 'register',
    component: RegisterComponent
},

{
    path: 'login',
    component: LoginComponent
},

{
    path: 'profile',
    canActivate: [authGuard],
    component: ProfileComponent

},

{
    path: 'actualizar-contrasena',
    component: UpdatePasswordComponent

}


];
