import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

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
    public form: FormGroup = new FormGroup  ({
    name: new FormControl('', [
      Validators.required,
      Validators.minLength(3) 
    ]),
    email: new FormControl('', [
      Validators.required,
      Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)
    ]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(8), 
      Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/) // Al menos 1 mayúscula, 1 minúscula y 1 número
    ])

  })

  isSubmitted: boolean = false;

  handleRegisterForm(){

    this.isSubmitted = true;

    console.log(this.form.value)
    console.log(this.form.valid)

    if(this.form.valid) {

    this.authservice.registerUser(this.form.value).subscribe({

      next: (data: any) => {
        console.log(data)
        this.message = data.message
        alert(this.message)
      },

      error: (error: any) => {
        console.log(error)
       
      }
    })
      
    }
     
    }

  }







        

