import { Component } from '@angular/core';
import { MenuListComponent } from './menu-list/menu-list.component';
import {MatDialogModule} from '@angular/material/dialog';
@Component({
  selector: 'app-restaurant-management',
  standalone: true,
  imports: [MenuListComponent,MatDialogModule],
  templateUrl: './restaurant-management.component.html',
  styleUrl: './restaurant-management.component.css'
})
export class RestaurantManagementComponent {

}
