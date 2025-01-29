import { Component } from '@angular/core';
import { FormGroup ,FormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { AdminService } from './../../services/admin.service';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-create-menu',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-menu.component.html',
  styleUrls: ['./create-menu.component.css'],
})
export class CreateMenuComponent {
  form!: FormGroup;

  constructor(private fb: FormBuilder, private adminService: AdminService) {}

  ngOnInit() {
    this.form = this.fb.group({
      name: ['', Validators.required],
      description: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      principal: ['', Validators.required],
      second: ['', Validators.required],
      desserts: ['', Validators.required],
      day: ['', Validators.required],
      isAvailable: [true],
    });
  }

  handleCreateMenuForm() {
    if (this.form.valid) {
      this.adminService.postMenu(this.form.value).subscribe({
        next: (res) => {
          console.log('Menú creado con éxito:', res);
        },
        error: (err) => {
          console.error('Error al crear el menú:', err);
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }
}
