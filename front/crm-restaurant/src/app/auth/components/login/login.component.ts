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
private message: string = ''


public form: FormGroup = new FormGroup ({

email: new FormControl('', Validators.required),
password: new FormControl('', Validators.required), 

})

//event binding. Método del evento del summit del fomulario formulario
handleLoginForm(){

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
      /*this.router.navigate([localStorage.getItem('redirectUrl')])*/
      this.router.navigate([('auth/profile')])
    },

    error: (error: any) => {
      console.log(error)
    }

  })
    
  }
}
};
