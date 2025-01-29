import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { MatDialog } from '@angular/material/dialog';
import { ModalComponent } from '../modal/modal.component';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';
import { CreateMenuComponent } from '../create-menu/create-menu.component';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './menu-list.component.html',
  styleUrl: './menu-list.component.css',
})
export class MenuListComponent implements OnInit {
  private adminService: AdminService = inject(AdminService)!;
  public menuList: any = [];
  public currentMenu: any = null;
  private currentIndex: number = 0;

  constructor(private _matDialog: MatDialog) {}

  ngOnInit() {

    this.adminService.getMenus().subscribe((menu) => {
      this.menuList = menu;
      if (this.menuList.length > 0) {
        this.currentMenu = this.menuList[this.currentIndex];
      }
    });
  }

  public nextSlide() {
    if (this.currentIndex < this.menuList.length - 1) {
      this.currentIndex++;
      this.currentMenu = this.menuList[this.currentIndex];
    }
  }

  public prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.currentMenu = this.menuList[this.currentIndex];
    }
  }

  openModalEdit(menu: any): void {
    const dialogRef = this._matDialog.open(ModalComponent, {
      width: '600px',
      height: '800px',
      // padding: '36px 24px 24px 24px',
      data: {
        title: 'Editar Menú',
        component: UpdateMenuComponent,
        menuData: menu,
      },
    });

    // Refresh menu-list
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        // Reload menu
        this.adminService.getMenus().subscribe((menu) => {
          this.menuList = menu;
          if (this.menuList.length > 0) {
            this.currentMenu = this.menuList[this.currentIndex];
          }
        });
      }
    });
  }


  openModalCreate(): void {
    const dialogRef = this._matDialog.open(ModalComponent, {
      width: '600px',
      height: '800px',
      data: {
        title: 'Crear Menú',
        component: CreateMenuComponent,
      },
    });

    // Refresh menu-list
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.refreshMenuList();
      }
    });
  }

// Refresh menu-list
  private refreshMenuList(): void {
    this.adminService.getMenus().subscribe((menu) => {
      this.menuList = menu;
      if (this.menuList.length > 0) {
        this.currentMenu = this.menuList[this.currentIndex];
      }
    });
  }
}
