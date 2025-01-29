import { Routes } from '@angular/router';
import { authGuard } from './auth/guards/auth.guard';
import { HomeComponent } from './home/home.component';
import { AddBookingComponent } from './auth/components/reservations/components/add-booking/add-booking.component';
import { EventsCalendarComponent } from './auth/components/reservations/components/events-calendar/events-calendar.component';

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
    path: 'addbooking', component: AddBookingComponent
  },
  {
    path: 'events-calendar', component: EventsCalendarComponent
  },

  {
    path: 'admin',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./admin/admin.routes').then((module) => module.ADMIN_ROUTES),
  },

  {
    path: '**',
    redirectTo: '',
  },
];
