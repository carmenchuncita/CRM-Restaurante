import { Component, inject } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

  private router: Router = inject(Router)
  private authService: AuthService = inject(AuthService)
  public isSubmitted: boolean = false;
  private message: string = ''
  public errorMessage: string = ''



  public form: FormGroup = new FormGroup({

    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ]),// pattern según validación del back, formato email,
    password: new FormControl('', Validators.required),

  })


  //event binding. Método del evento del summit del fomulario formulario
  handleLoginForm() {

    this.isSubmitted = true;

    console.log(this.form.value)
    console.log(this.form.valid)


    // si el formjulario cumple con la validaciones me suscribo al servicio y guardo en el logcalStorage el tokem, el email y role.
    if (this.form.valid) {

      this.authService.loginUser(this.form.value).subscribe({

        next: (data: any) => {
          console.log(data)
          this.message = data.message
       
          // guardo en el localStorage el token, el email, el role y el id 
          localStorage.setItem('token', data.token)
          localStorage.setItem('email', data.user.email)
          localStorage.setItem('role', data.user.role)
          localStorage.setItem('id', data.user.id)

          //obtengo con el getItem la url que este en ese momento guardad en el localStorage, si es register o reservas vuelve a reservas  si no vuelo a profile lo que me asegura que el client pueda o bien ver su perfil o bien hacer una reserva después de loguearse. Y después borro la url alamcenada una vez usada para que no cause interferencia en otras acciones.
          const redirectUrl = localStorage.getItem('redirectUrl') || '/dashboard';
          if (redirectUrl === '/auth/register' || redirectUrl === '/reservas') {
            this.router.navigate(['/reservas']).then(() => {
              window.location.reload();
            });
          } else {
            this.router.navigate(['/auth/profile']);
          }

          localStorage.removeItem('redirectUrl');

        },

        error: (error: any) => {

          console.error('Error de inicio de sesión', error);

          // Validaciones específicas del backend
          if (error.error.message === 'Usuario no encontrado') {
            this.form.get('email')?.setErrors({ notExists: true });
          }
          if (error.error.message === 'Contraseña incorrecta') {
            this.form.get('password')?.setErrors({ incorrectPassword: true });
          }

          this.errorMessage = error.error.message;
        }

      })

    }
  }
};
