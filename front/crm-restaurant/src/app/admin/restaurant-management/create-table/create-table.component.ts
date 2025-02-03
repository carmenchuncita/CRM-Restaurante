import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { AdminService } from './../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-table',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-table.component.html',
  styleUrl: './create-table.component.css',
})
export class CreateTableComponent {
  @Output() closePanel: EventEmitter<boolean> = new EventEmitter<boolean>();
  form!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit() {
    this.form = this.fb.group({
      nombre: ['', Validators.required],
      capacidad: ['', Validators.required],
      isAvailable: [true],
    });
  }

  handleCreateTable() {
    if (this.form.valid) {
      const newTable = this.form.value;
      console.log('Datos enviados al backend:', newTable);

      this.adminService.postTable(newTable).subscribe({
        next: (res) => {
          console.log('Mesa creada con éxito:', res);

          Swal.fire({
            icon: 'success',
            title: '¡Mesa creada!',
            text: 'Tu mesa se ha creado con éxito.',
            confirmButtonText: 'Aceptar',
          }).then(() => {
            this.form.reset();
            //no cierra el panel//
            this.cancel();
          });
        },
        error: (err) => {
          console.error('Error al crear el mesa:', err.error);
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }

  cancel() {
    this.closePanel.emit(false);
  }
}
