import { Routes } from '@angular/router';
import { RestaurantManagementComponent } from '../admin/restaurant-management/restaurant-management.component';
import { authGuard } from '../auth/guards/auth.guard'; // Importar el guard

export const ADMIN_ROUTES: Routes = [
  {
    path: 'management',
    component: RestaurantManagementComponent,
    canActivate: [authGuard]
  },
];
