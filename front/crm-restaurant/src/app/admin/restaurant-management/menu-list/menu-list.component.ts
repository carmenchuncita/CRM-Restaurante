import { Component, inject,OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent implements OnInit {
  private adminService: AdminService = inject(AdminService)!;
  public menuList: any = [];

  ngOnInit() {
    this.adminService.getMenus().subscribe((menu) => {
      this.menuList = menu
    });
  }
}
