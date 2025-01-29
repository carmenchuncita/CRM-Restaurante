import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AdminService } from '../../services/admin.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-update-menu',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './update-menu.component.html',
  styleUrls: ['./update-menu.component.css']
})
export class UpdateMenuComponent implements OnInit {
  form!: FormGroup;

  constructor(
    private fb: FormBuilder,
    private adminService: AdminService,
    private dialogRef: MatDialogRef<UpdateMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {}

  ngOnInit() {
    const menu = this.data.menuData;

    this.form = this.fb.group({
      name: [menu.name, Validators.required],
      description: [menu.description, Validators.required],
      price: [menu.price, [Validators.required, Validators.min(0)]],
      principal: [menu.principal, Validators.required],
      second: [menu.second, Validators.required],
      desserts: [menu.desserts, Validators.required],
      day: [menu.day, Validators.required],
      isAvailable: [menu.isAvailable],
    });
  }

  handleEditMenuForm() {
    if (this.form.valid) {
      const updatedMenu = this.form.value;
      this.adminService.updateMenu(this.data.menuData._id, updatedMenu).subscribe({
        next: (res) => {
          console.log('Menú actualizado con éxito:', res);
          this.dialogRef.close(true);
        },
        error: (err) => {
          console.error('Error al actualizar el menú:', err);
        },
      });
    } else {
      console.error('Formulario inválido');
    }
  }

  cerrarModal() {
    this.dialogRef.close(false);
}

}
