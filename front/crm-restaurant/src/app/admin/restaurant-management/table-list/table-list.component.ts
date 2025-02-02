import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-table-list',
  imports: [CommonModule],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css'
})
export class TableListComponent {
  public tableList: any[] = [];
  private adminService: AdminService = inject(AdminService);
  private message: string = '';

  ngOnInit() {

    this.adminService.getAllTables().subscribe({
      next: (data: any) => {
        console.log(data)
        this.tableList = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
}
}
