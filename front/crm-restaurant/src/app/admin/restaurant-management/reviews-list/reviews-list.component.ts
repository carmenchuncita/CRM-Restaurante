import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reviews-list',
  imports: [CommonModule],
  templateUrl: './reviews-list.component.html',
  styleUrl: './reviews-list.component.css'
})
export class ReviewsListComponent {
  public reviewList: any[] = [];
  private adminService: AdminService = inject(AdminService);
  private message: string = '';

  ngOnInit() {
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
