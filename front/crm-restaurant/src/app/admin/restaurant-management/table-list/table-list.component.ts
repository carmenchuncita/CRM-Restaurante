import { Component, inject, OnInit } from '@angular/core';
import { AdminService } from '../../services/admin.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SidenavPanelComponent } from '../sidenav-panel/sidenav-panel.component';
import { UpdateTableComponent } from '../update-table/update-table.component';
import { CreateTableComponent } from '../create-table/create-table.component';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-table-list',
  imports: [RouterModule, CommonModule, SidenavPanelComponent],
  templateUrl: './table-list.component.html',
  styleUrl: './table-list.component.css',
})
export class TableListComponent implements OnInit {
  private adminService: AdminService = inject(AdminService);
  public tableList: any = [];

  public isPanelOpen = false;
  public panelTitle = '';
  public panelComponent: any = null;
  public panelData: any = null;

  ngOnInit() {
    this.adminService.getAllTables().subscribe({
      next: (data: any) => {
        this.tableList = data;
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }

  openEditPanelTable(table: any): void {
    this.isPanelOpen = true;
    this.panelTitle = 'Editar Mesa';
    this.panelComponent = UpdateTableComponent;
    this.panelData = { tableData: table };
  }

  openCreatePanelTable(): void {
    this.isPanelOpen = true;
    this.panelTitle = 'Crear Mesa';
    this.panelComponent = CreateTableComponent;
    this.panelData = null;
  }

  closePanel(): void {
    this.isPanelOpen = false;
    this.panelTitle = '';
    this.panelComponent = null;
    this.panelData = null;
    this.refreshTableList();
  }

  private refreshTableList(): void {
    this.adminService.getAllTables().subscribe((table) => {
      this.tableList = table;

    });
  }

  toggleAvailability(table: any) {
    const newState = !table.isAvailable;

    Swal.fire({
      title: '¿Estás seguro?',
      text: `La mesa será marcada como ${
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
          .updateTable(table._id, { isAvailable: newState })
          .subscribe({
            next: (res) => {
              Swal.fire(
                '¡Actualizado!',
                `La mesa ahora está ${
                  newState ? 'disponible' : 'no disponible'
                }.`,
                'success'
              );
              table.isAvailable = newState;
            },
            error: (err) => {
              Swal.fire(
                'Error',
                'No se pudo actualizar el estado de la mesa.',
                'error'
              );
              console.error(err);
            },
          });
      }
    });
  }

  deleteTable(table: any) {
    Swal.fire({
      icon: 'warning',
      title: `¿Estás seguro de eliminar la mesa "${table.nombre}"?`,
      text: 'Esta acción no se puede deshacer.',
      showCancelButton: true,
      confirmButtonColor: '#e3f982',
      cancelButtonColor: '#e3e4dc',
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
    }).then((result) => {
      if (result.isConfirmed) {
        this.adminService.deleteTable(table._id).subscribe({
          next: () => {
            Swal.fire({
              icon: 'success',
              title: 'Mesa eliminada',
              text: 'La mesa ha sido eliminada correctamente.',
            }).then(() => {
              this.refreshTableList();
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al eliminar la mesa.',
            });
            console.error('Error al eliminar la mesa:', err);
          },
        });
      }
    });
  }

}
