import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';

@Component({
  selector: 'app-reviews-list',
  imports: [],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {
 public reviewList: any = {};
  private adminService: AdminService = inject(AdminService);
  private message: string = '';

  OnInit() {
    this.adminService.getAllReviews().subscribe({
      next: (data: any) => {
        this.reviewList = data;
        console.log("data", data);
      },
      error: (error: any) => {
        console.log(error);
      },
    });

  }
}
