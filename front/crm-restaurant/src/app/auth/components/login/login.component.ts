import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent {

private router: Router = inject(Router)
private authService: AuthService =inject(AuthService)
public isSubmitted: boolean = false;
private message: string = ''
public errorMessage: string = ''


public form: FormGroup = new FormGroup ({

email: new FormControl('', [
  Validators.required,
  Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
]),// pattern según validación del back, formato email,
password: new FormControl('', Validators.required), 

})


//event binding. Método del evento del summit del fomulario formulario
handleLoginForm(){

this.isSubmitted = true;

console.log(this.form.value)
console.log(this.form.valid)


// si el formjulario cumple con la validaciones me suscribo al servicio y guardo en el logcalStorage el tokem, el email y role.
if(this.form.valid) {

this.authService.loginUser(this.form.value).subscribe({

    next: (data: any) => {
      console.log(data)
      this.message = data.message
      alert(this.message)
      Swal.fire({
        title: this.message, //Editar
        text: 'Por favor introduzca una contraseña fffffffffffffffffffffffffffffff', //"ditar
        background: '#f7f7f7',
        color: '#282826',
        confirmButtonColor: '#d4e157',
        confirmButtonText: 'Close',
        customClass: {
          popup: 'custom-swal-popup',
        }
      });
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.user.email)
      localStorage.setItem('role', data.user.role)
      localStorage.setItem('id', data.user.id)
      /*this.router.navigate([localStorage.getItem('redirectUrl')])
    
      if(data.user.role === 'client' || data.user.role === 'admin'){
        const redirectUrl = localStorage.getItem('redirectUrl') || '/auth/profile' ;
        localStorage.removeItem('redirectUrl'); // Limpiar el redirectUrl después de usarlo
        if(redirectUrl === '/auth/profile'){
          localStorage.removeItem('redirectUrl')
          this.router.navigate([redirectUrl])
        }

        if(data.user.role === 'client' &&  redirectUrl === '/auth/register'){ // confirmar si este es el path
          this.router.navigate(['/reservas'])
        }
      }

        /*if(data.user.role === 'client' || data.user.role === 'admin'){
        const redirectUrl = localStorage.getItem('redirectUrl') || '/auth/profile' ;
        localStorage.removeItem('redirectUrl'); // Limpiar el redirectUrl después de usarlo
        if(redirectUrl === '/auth/profile'){
          localStorage.removeItem('redirectUrl')
          this.router.navigate([redirectUrl])
        }

        if(data.user.role === 'client' &&  redirectUrl === '/auth/register'){ // confirmar si este es el path
          this.router.navigate(['/reservas'])
        }

        if (redirectUrl === '/auth/login') {
          // Después de login, redirige a reservas
          this.router.navigate(['/reservas']);
        }
        
      }*/
      

        const redirectUrl = localStorage.getItem('redirectUrl') || '/dashboard'; // Ruta por defecto
        localStorage.removeItem('redirectUrl'); // Limpiar el valor después de usarlo
        
        if (redirectUrl === '/auth/register' || '/reservas') {
          this.router.navigate(['/reservas']).then(() => {
            window.location.reload(); // Recarga la página después de la navegación
          });
        } else {
          this.router.navigate([redirectUrl]); // Redirigir a la URL almacenada o por defecto
        }
  
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
