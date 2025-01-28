import { Component } from '@angular/core';
import { MenuListComponent } from './menu-list/menu-list.component';

@Component({
  selector: 'app-restaurant-management',
  standalone: true,
  imports: [MenuListComponent],
  templateUrl: './restaurant-management.component.html',
  styleUrl: './restaurant-management.component.css'
})
export class RestaurantManagementComponent {

}
