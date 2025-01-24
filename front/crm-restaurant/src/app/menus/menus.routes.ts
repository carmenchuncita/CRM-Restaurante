import { Routes } from '@angular/router';
import { MenusComponent } from './components/menus/menus.component';
import { MenuDetailsComponent } from './components/menu-details/menu-details.component';

export const MENUS_ROUTES: Routes = [
  {
    path: 'menus',
    component: MenusComponent,
  },

  {
    path: 'menu/:_id',
    component: MenuDetailsComponent,
  },
];
