import { Component, inject } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-update-password',
  imports: [],
  templateUrl: './update-password.component.html',
  styleUrl: './update-password.component.css'
})
export class UpdatePasswordComponent {


   /* private authService: AuthService = inject(AuthService)
    private router: Router = inject(Router)
  
    public id!: string;
    public updateProfileIsActive: boolean = false;
    public userData: any = { user: {} };
    public isSubmittedUpdate: boolean = false;
    public isSubmittedReview: boolean = false;
    private message: string = ''
    public errorMessage: string = ''
  
    
  
    public form: FormGroup = new FormGroup({
      reviwer: new FormControl( '', [Validators.required, Validators.minLength(3)] ),
      rating: new FormControl('', Validators.required),
      description: new FormControl('', Validators.required)
    })



  handleUpdateProfileForm() {
    this.isSubmittedUpdate = true;
  
    console.log(this.profileForm.value);
    console.log(this.profileForm.valid);
  
    if (this.profileForm.valid) {
      // Filtramos solo los valores que tienen datos
      const formData: any = {};
      if (this.profileForm.value.name.trim() !== ''){
        formData.name = this.profileForm.value.name;
      } 
      if (this.profileForm.value.password.trim() !== ''){
        formData.password = this.profileForm.value.password;
      } 
  
      // Si no hay nada que actualizar, no enviamos la solicitud
      if (Object.keys(formData).length === 0) {
        
         Swal.fire({
                title: this.message, 
                text: 'No se ha indicado ningún cambio a actualizar', 
                background: '#f7f7f7',
                color: '#282826',
                confirmButtonColor: '#d4e157',
                confirmButtonText: 'Close',
                customClass: {
                  popup: 'custom-swal-popup',
                }
              });
        this.updateProfileIsActive = !this.updateProfileIsActive;
  
        return;
      }
  
      this.authService.updateUser(formData).subscribe({
        next: (data: any) => {
          console.log(data);
          this.message = data.message;
          if (formData.name) this.userData.user.name = formData.name;
          this.updateProfileIsActive = !this.updateProfileIsActive;
        },
        error: (error: any) => {
          console.error('Error en la ejecución del registro', error);
          if (error.error.message === 'El correo electrónico ya está registrado') {
         Swal.fire({
          title: this.message, 
          text: 'Ya existe una cuenta con esta dirección de e-mail', 
          background: '#f7f7f7',
          color: '#282826',
          confirmButtonColor: '#d4e157',
          confirmButtonText: 'Close',
          customClass: {
            popup: 'custom-swal-popup',
          }
        });
            
            this.router.navigate(['/auth/login']);
          }
          this.errorMessage = error.error.message;
        },
      });
    }
  }*/

}
