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
  selector: 'app-update-menu',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css'],
})
export class UpdateMenuComponent implements OnInit {
  @Input() panelData: any;
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    @Inject('panelData') public data: any
  ) {}

  ngOnInit() {
    const menu = this.data?.menuData || {};

    this.form = this.fb.group({
      name: [menu.name || '', Validators.required],
      description: [menu.description || '', Validators.required],
      price: [menu.price || '', [Validators.required, Validators.min(0)]],
      principalOptionA: [menu.principalOptionA || '', Validators.required],
      principalOptionB: [menu.principalOptionB || '', Validators.required],
      principalOptionC: [menu.principalOptionC || '', Validators.required],
      secondOptionA: [menu.secondOptionA || '', Validators.required],
      secondOptionB: [menu.secondOptionB || '', Validators.required],
      secondOptionC: [menu.secondOptionC || '', Validators.required],
      dessertsOptionA: [menu.dessertsOptionA || '', Validators.required],
      dessertsOptionB: [menu.dessertsOptionB || '', Validators.required],
      dessertsOptionC: [menu.dessertsOptionC || '', Validators.required],
      day: [menu.day || '', Validators.required],
      isAvailable: [menu.isAvailable || false],
    });
  }

  handleEditMenuForm() {
    if (this.form.valid) {
      const updatedMenu = this.form.value;
      this.adminService
        .updateMenu(this.data.menuData._id, updatedMenu)
        .subscribe({
          next: (res) => {
            console.log('Menú actualizado con éxito:', res);
          },
          error: (err) => {
            console.error('Error al actualizar el menú:', err);
          },
        });
    }
  }

  cancelar() {
    this.panelData.close(false);
  }
}
