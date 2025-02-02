import { AdminService } from './../../services/admin.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-table',
  imports: [],
  templateUrl: './delete-table.component.html',
  styleUrl: './delete-table.component.css'
})
export class DeleteTableComponent {
  private adminService: AdminService = inject(AdminService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public id: string = '';
  public message: string = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];

      this.adminService.deleteTable(id).subscribe({
        next: (data: any) => {
          console.log(data);
          this.message = data.message;
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    });
  }
}
