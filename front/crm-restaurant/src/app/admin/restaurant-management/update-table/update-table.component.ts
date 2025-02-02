import { Component, OnInit, Input, Inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-update-table',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-table.component.html',
  styleUrl: './update-table.component.css'
})
export class UpdateTableComponent implements OnInit{
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
        .updateTable(this.data.taleData._id, updatedTable)
        .subscribe({
          next: (res) => {
            console.log('Mesa actualizada con éxito:', res);
          },
          error: (err) => {
            console.error('Error al actualizar el mesa:', err);
          },
        });
    }
  }

  cancel() {
    this.initializeForm();
    console.log('Edición cancelada, formulario restablecido');
  }
}
