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
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),

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







        

