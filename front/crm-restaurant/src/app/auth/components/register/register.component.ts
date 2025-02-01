import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { HeaderComponent } from '../../../header/header.component';

@Component({
  selector: 'app-register',
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent {

    private authservice: AuthService = inject(AuthService)
    private router: Router = inject(Router)
    private message: string = ''
    public isSubmitted: boolean = false;
    public errorMessage: boolean = false;


    public form: FormGroup = new FormGroup  ({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3) //al menos debe tener 3 caracteres
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ]),// pattern según validación del back, formato email
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8), //al menos 8 caracteres
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/) // Al menos 1 mayúscula, 1 minúscula y 1 número
    ])

  })



  handleRegisterForm(){

    this.isSubmitted = true;

    console.log(this.form.value)
    console.log(this.form.valid)

    if(this.form.valid) {

    this.authservice.registerUser(this.form.value).subscribe({

      next: (data: any) => {
        console.log(data)
        localStorage.setItem('id', data.data._id)
        this.message = data.message
        localStorage.setItem('redirectUrl', '/auth/register');
        this.router.navigate(['auth/login'])
      },

      error: (error: any) => {
        console.error('Error en la ejecución del registro', error);

          // Validaciones específicas del backend
          if (error.error.message === 'El correo electrónico ya está registrado') {
            alert('Ya exite una cuenta con esta dirección de e-mail, por favor inicie sesión para confirmar su reserva')
            this.router.navigate(['/auth/login'])
          }
        
          this.errorMessage = error.error.message;
       
      }
    })
      
    }
     
    }

  }







        

