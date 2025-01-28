import { AdminService } from './../../services/admin.service';
import { Component, inject } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-create-menu',
  imports: [FormsModule, RouterModule, ReactiveFormsModule],
  templateUrl: './create-menu.component.html',
  styleUrl: './create-menu.component.css',
})
export class CreateMenuComponent {
  private adminService: AdminService = inject(AdminService);
  private message: string = '';

  form: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
    price: new FormControl('', [Validators.required]),
    image: new FormControl('', [Validators.required]),
    category: new FormControl('', [Validators.required]),
  });

  handleCreateMenuForm() {
    console.log(this.form.value);
    console.log(this.form.valid);

    if (this.form.valid) {
      this.adminService.postMenu(this.form.value).subscribe({
        next: (data: any) => {
          console.log(data);
          this.message = data.message;
          alert(this.message);
        },

        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
