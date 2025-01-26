import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

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
      localStorage.setItem('token', data.token)
      localStorage.setItem('email', data.user.email)
      localStorage.setItem('role', data.user.role)
      localStorage.setItem('id', data.user.id)
      /*this.router.navigate([localStorage.getItem('redirectUrl')])
      si no funciona la lógica de abajo ver este camino*/
      if(data.user.role === 'client'){
        const redirectUrl = localStorage.getItem('redirectUrl');
        localStorage.removeItem('redirectUrl'); // Limpiar el redirectUrl después de usarlo
        if(redirectUrl === '/auth/profile'){
          this.router.navigate([redirectUrl])
        }

        if(redirectUrl === '/reservas'){ // confirmar si este es el path
          this.router.navigate([redirectUrl])
        }
      }
      
      /*this.router.navigate([('auth/admin')]) descomentar cuando tengamos la ruta a la va el admin al registrarse*/
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
