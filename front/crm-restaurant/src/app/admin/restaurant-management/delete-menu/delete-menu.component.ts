import { AdminService } from './../../services/admin.service';
import { Component, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-delete-menu',
  imports: [],
  templateUrl: './delete-menu.component.html',
  styleUrl: './delete-menu.component.css',
})
export class DeleteMenuComponent {
  private adminService: AdminService = inject(AdminService);
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute);

  public id: string = '';
  public message: string = '';

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      const id = params['id'];

      this.adminService.deleteMenu(id).subscribe({
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
