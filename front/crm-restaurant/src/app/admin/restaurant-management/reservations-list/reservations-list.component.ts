import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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
  public filteredReservationsList: any[] = [];
  private adminService: AdminService = inject(AdminService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);
  public id!: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.id = params['id'];

      this.adminService.getReservations().subscribe({
        next: (data: any) => {
          this.reservationsList = data;
          this.filteredReservationsList = [...this.reservationsList];
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });
  }

  showTodayReservations() {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    this.filteredReservationsList = this.reservationsList.filter(
      (reservation) => {
        const reservationDate = new Date(reservation.date);
        reservationDate.setHours(0, 0, 0, 0);

        return reservationDate.getTime() === today.getTime();
      }
    );
  }

  showAllReservations() {
    this.filteredReservationsList = [...this.reservationsList];
  }
}
