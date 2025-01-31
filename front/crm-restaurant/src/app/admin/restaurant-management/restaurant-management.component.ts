import { Component } from '@angular/core';
import { MenuListComponent } from './menu-list/menu-list.component';
import { MatDialogModule} from '@angular/material/dialog';
import { ReservationsListComponent } from "./reservations-list/reservations-list.component";
import { ReviewsListComponent } from "./reviews-list/reviews-list.component";
@Component({
  selector: 'app-restaurant-management',
  standalone: true,
  imports: [MenuListComponent, MatDialogModule, ReservationsListComponent, ReviewsListComponent],
  templateUrl: './restaurant-management.component.html',
  styleUrl: './restaurant-management.component.css'
})
export class RestaurantManagementComponent {

}
