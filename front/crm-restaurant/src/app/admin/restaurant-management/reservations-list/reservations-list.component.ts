import { Component, } from '@angular/core';
import { inject } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations-list',
  imports: [CommonModule],
  templateUrl: './reservations-list.component.html',
  styleUrl: './reservations-list.component.css',
})
export class ReservationsListComponent {
  public reservationsList: any[] = [];
  private adminService: AdminService = inject(AdminService);

  ngOnInit() {
    this.adminService.getAllReservations().subscribe({
      next: (data: any) => {
        console.log("data", data);
        this.reservationsList = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });

  }
}
