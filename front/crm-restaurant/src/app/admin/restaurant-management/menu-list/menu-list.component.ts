import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidenavPanelComponent } from '../sidenav-panel/sidenav-panel.component';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';
import { CreateMenuComponent } from '../create-menu/create-menu.component';

@Component({
  selector: 'app-menu-list',
  standalone: true,
  imports: [RouterModule, CommonModule, SidenavPanelComponent],
  templateUrl: './menu-list.component.html',
  styleUrls: ['./menu-list.component.css'],
})
export class MenuListComponent implements OnInit {
  private adminService: AdminService = inject(AdminService)!;
  public menuList: any = [];
  public currentMenu: any = null;
  private currentIndex: number = 0;

  public isPanelOpen = false;
  public panelTitle = '';
  public panelComponent: any = null;
  public panelData: any = null;

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

  openEditPanel(menu: any): void {
    this.isPanelOpen = true;
    this.panelTitle = 'Editar Menú';
    this.panelComponent = UpdateMenuComponent;
    this.panelData = { menuData: menu };
    console.log('Datos del menú:', menu);
  }

  openCreatePanel(): void {
    this.isPanelOpen = true;
    this.panelTitle = 'Crear Menú';
    this.panelComponent = CreateMenuComponent;
    this.panelData = null;
  }

  closePanel(): void {
    this.isPanelOpen = false;
    this.panelTitle = '';
    this.panelComponent = null;
    this.panelData = null;
    this.refreshMenuList();
  }

  private refreshMenuList(): void {
    this.adminService.getMenus().subscribe((menu) => {
      this.menuList = menu;
      if (this.menuList.length > 0) {
        this.currentMenu = this.menuList[this.currentIndex];
      }
    });
  }
}
