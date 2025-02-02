import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-update-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-table.component.html',
  styleUrl: './update-table.component.css'
})
export class UpdateTableComponent implements OnInit{
  public tableList: any = [];
  public isPanelOpen = false;
  public panelTitle = '';
  public panelComponent: any = null;


  @Input() panelData: any;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    @Inject('panelData') public data: any
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  private initializeForm() {
    const table = this.data?.tableData || {};
    this.form = this.fb.group({
      nombre: [table.nombre || '', Validators.required],
      capacidad: [table.capacidad || '', Validators.required],
      isAvailable: [table.isAvailable || false],
    });
  }

  handleEditTable() {
    if (this.form.valid) {
      const updatedTable = this.form.value;
      this.adminService
        .updateTable(this.data.tableData._id, updatedTable)
        .subscribe({
          next: (res) => {
            Swal.fire({
              icon: 'success',
              title: 'Mesa actualizada',
              text: 'Los cambios se han guardado correctamente.',
              confirmButtonText: 'Aceptar'
            }).then(() => {
              this.closePanel();
            });
          },
          error: (err) => {
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: 'Hubo un problema al actualizar la mesa.',
              confirmButtonText: 'Cerrar'
            });
            console.error('Error al actualizar la mesa:', err);
          }
        });
    }
  }

 private refreshTableList(): void {
    this.adminService.getAllTables().subscribe((table) => {
      this.tableList = table;

    });
  }

  closePanel(): void {
    this.isPanelOpen = false;
    this.panelTitle = '';
    this.panelComponent = null;
    this.panelData = null;
    this.refreshTableList();
  }
  cancel() {
    this.initializeForm();
    console.log('Edición cancelada, formulario restablecido');
  }
}
