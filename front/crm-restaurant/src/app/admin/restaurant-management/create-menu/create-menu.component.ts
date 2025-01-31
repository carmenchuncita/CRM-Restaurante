import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './../../services/admin.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-create-menu',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css'],
})
export class CreateMenuComponent implements OnInit {
  @Output() closePanel: EventEmitter<boolean> = new EventEmitter<boolean>(); // Emite eventos para cerrar el panel
  form!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      principalOptionA: ['', Validators.required],
      principalOptionB: ['', Validators.required],
      principalOptionC: ['', Validators.required],
      secondOptionA: ['', Validators.required],
      secondOptionB: ['', Validators.required],
      secondOptionC: ['', Validators.required],
      dessertsOptionA: ['', Validators.required],
      dessertsOptionB: ['', Validators.required],
      dessertsOptionC: ['', Validators.required],
      day: ['', Validators.required],
      isAvailable: [true],
    });
  }

  handleCreateMenuForm() {
    if (this.form.valid) {
      const newMenu = this.form.value;
      console.log('Datos enviados al backend:', newMenu);

      this.adminService.postMenu(newMenu).subscribe({
        next: (res) => {
          console.log('Menú creado con éxito:', res);

          Swal.fire({
            icon: 'success',
            title: '¡Menú creado!',
            text: 'Tu menú se ha creado con éxito.',
            confirmButtonText: 'Aceptar'
          }).then(() => {
            this.form.reset();
            //no cierra el panel//
            this.cancel();
          });

        },
        error: (err) => {
          console.error('Error al crear el menú:', err.error);
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
