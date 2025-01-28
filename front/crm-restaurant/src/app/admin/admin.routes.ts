import { Routes } from '@angular/router';
import { CreateMenuComponent } from '../admin/restaurant-management/create-menu/create-menu.component';
import { DeleteMenuComponent } from '../admin/restaurant-management/delete-menu/delete-menu.component';
import { UpdateMenuComponent } from '../admin/restaurant-management/update-menu/update-menu.component';
import { RestaurantManagementComponent } from '../admin/restaurant-management/restaurant-management.component';
import { authGuard } from '../auth/guards/auth.guard'; // Importar el guard

export const ADMIN_ROUTES: Routes = [
  {
    path: 'management',
    component: RestaurantManagementComponent,
    canActivate: [authGuard]
  },
  {
    path: 'create-menu',
    component: CreateMenuComponent,
    canActivate: [authGuard]
  },
  {
    path: 'delete-menu/:id',
    component: DeleteMenuComponent,
    canActivate: [authGuard]
  },
  {
    path: 'update-menu/:id',
    component: UpdateMenuComponent,
    canActivate: [authGuard]
  },
];
