import { RESERVATIONS_ROUTES } from './reservations/reservations.routes';
import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AboutUsComponent } from './about-us/about-us.component';
import { Error404Component } from './error404/error404.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },

  {
    path: 'home',
    component: HomeComponent,
  },

  {
    path: 'auth' /* se puede dejar vacío */,
    loadChildren: () =>
      import('./auth/auth.routes').then((module) => module.AUTH_ROUTES),
  },

  {
    path: '',
    loadChildren: () =>
      import('./menus/menus.routes').then((module) => module.MENUS_ROUTES),
  },

  {
    path: '',
    loadChildren: () =>
      import('./reservations/reservations.routes').then((module) => module.RESERVATIONS_ROUTES),
  },


  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./admin/admin.routes').then((module) => module.ADMIN_ROUTES),
  },

  {
    path: 'about-us',
    component: AboutUsComponent,
  },

  {
    path: '**',
    component: Error404Component,
  },
];
