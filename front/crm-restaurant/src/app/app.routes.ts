import { Routes } from '@angular/router';

export const routes: Routes = [


{
    path: 'auth', /* se puede dejar vacío */
    loadChildren: () => (import('./auth/auth.routes')).then(module  => module.AUTH_ROUTES)    
},

    
{
    path: '**',
    redirectTo: ''
}


];
