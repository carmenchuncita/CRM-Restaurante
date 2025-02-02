import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from './../../services/admin.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidenavPanelComponent } from '../sidenav-panel/sidenav-panel.component';
import { UpdateMenuComponent } from '../update-menu/update-menu.component';
import { CreateMenuComponent } from '../create-menu/create-menu.component';
import Swal from 'sweetalert2';

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
  public menusToShow: number = window.innerWidth < 768 ? 1 : 2;

 public getVisibleMenus(): any[] {
  return this.menuList.slice(this.currentIndex, this.currentIndex + this.menusToShow);
}


  ngOnInit() {
    window.addEventListener('resize', () => {
      this.menusToShow = window.innerWidth < 768 ? 1 : 2;
    });
    this.adminService.getMenus().subscribe((menu) => {
      this.menuList = menu;
      if (this.menuList.length > 0) {
        this.currentMenu = this.menuList[this.currentIndex];
      }
    });
  }

  public nextSlide() {
    if (this.currentIndex < this.menuList.length - 2) {
      this.currentIndex++;
    }
  }

  public prevSlide() {
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
  }

  openEditPanel(menu: any): void {
    this.isPanelOpen = true;
    this.panelTitle = 'Editar Menú';
    this.panelComponent = UpdateMenuComponent;
    this.panelData = { menuData: menu };
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

  deleteMenu(menu: any): void {
    Swal.fire({
      title: `¿Estás seguro de eliminar el menú "${menu.name}"?`,
      text: 'Esta acción no se puede deshacer.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3f982',
      cancelButtonColor: '#e3e4dc',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteMenu(menu._id).subscribe({
          next: (res) => {
            Swal.fire(
              'Eliminado',
              'El menú ha sido eliminado con éxito.',
              'success'
            );
            this.refreshMenuList();
          },
          error: (err) => {
            Swal.fire(
              'Error',
              'Ocurrió un error al eliminar el menú.',
              'error'
            );
            console.error('Error al eliminar el menú:', err);
          },
        });
      }
    });
  }

  toggleAvailability(menu: any) {
    const newState = !menu.isAvailable;

    Swal.fire({
      title: '¿Estás seguro?',
      text: `El menú será marcado como ${
        newState ? 'disponible' : 'no disponible'
      }.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#e3f982',
      cancelButtonColor: '#e3e4dc',
      confirmButtonText: `Sí, marcar como ${
        newState ? 'disponible' : 'no disponible'
      }`,
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService
          .updateMenu(menu._id, { isAvailable: newState })
          .subscribe({
            next: (res) => {
              Swal.fire(
                '¡Actualizado!',
                `El menú ahora está ${
                  newState ? 'disponible' : 'no disponible'
                }.`,
                'success'
              );
              menu.isAvailable = newState;
            },
            error: (err) => {
              Swal.fire(
                'Error',
                'No se pudo actualizar el estado del menú.',
                'error'
              );
              console.error(err);
            },
          });
      }
    });
  }
}
