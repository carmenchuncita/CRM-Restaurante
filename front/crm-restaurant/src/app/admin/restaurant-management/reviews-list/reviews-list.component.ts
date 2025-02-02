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
  public filteredReviews: any[] = [];
  private adminService: AdminService = inject(AdminService);

  ngOnInit() {
    this.adminService.getAllReviews().subscribe({
      next: (data: any) => {
        this.reviewList = data;
        this.filteredReviews = [...data];
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  getStars(rating: number): string {
    return '★★★★★☆☆☆☆☆'.slice(5 - rating, 10 - rating);
  }

  // Filtra por mejor puntuación (5 estrellas)
  filterBestReviews() {
    this.filteredReviews = this.reviewList.filter(review => review.rating === 5);
  }

  // Filtra por peor puntuación (1 estrella)
  filterWorstReviews() {
    this.filteredReviews = this.reviewList.filter(review => review.rating === 1);
  }

  // Restablece la lista completa
  resetFilter() {
    this.filteredReviews = [...this.reviewList];
  }
}
