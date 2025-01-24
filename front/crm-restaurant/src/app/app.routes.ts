import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { adminGuard } from './auth/guards/admin.guard';

export const routes: Routes = [
  {
    path: 'auth' /* se puede dejar vacío */,
    loadChildren: () =>
      import('./auth/auth.routes').then((module) => module.AUTH_ROUTES),
  },

  {
    path: '',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./menus/menus.routes').then((module) => module.MENUS_ROUTES),
  },

  {
    path: 'admin',
    canActivate: [authGuard, adminGuard],
    loadChildren: () =>
      import('./admin/admin.routes').then((module) => module.ADMIN_ROUTES),
  },

  {
    path: '**',
    redirectTo: '/menus',
  },

  {
    path: '**',
    redirectTo: '',
  },
];
