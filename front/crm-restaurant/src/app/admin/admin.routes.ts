import { Routes } from '@angular/router';
import { CreateMenuComponent } from './components/create-menu/create-menu.component';
import { DeleteMenuComponent } from './components/delete-menu/delete-menu.component';
import { UpdateMenuComponent } from './components/update-menu/update-menu.component';

export const ADMIN_ROUTES: Routes = [
  {
    path: 'create-menu',
    component: CreateMenuComponent,
  },

  {
    path: 'delete-menu/:id',
    component: DeleteMenuComponent,
  },

  {
    path: 'update-menu/:id',
    component: UpdateMenuComponent,
  },
];
