import { Routes } from '@angular/router';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { ProfileComponent } from './components/profile/profile.component';
import { authGuard } from './guards/auth.guard';



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
}

    
];