import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

 
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private authService: AuthService = inject(AuthService)
  private router: Router = inject(Router)

  public id!: string;
  public userData: any = { user: {} };

  public isSubmitted: boolean = false;
  private message: string = ''
  public errorMessage: string = ''


  public form: FormGroup = new FormGroup({

    reviwer: new FormControl( '', [Validators.required, Validators.minLength(3)] ),
    rating: new FormControl('', Validators.required),
    description: new FormControl('', Validators.required)

  })

 //me permite obtener los datos del usuario logado y comparar que su id es igual al id que se ha envido por los params antes de que se pinte el componente.
  ngOnInit() {

    this.activatedRoute.params.subscribe(params => {
      this.id = params['id'];
      this.authService.profileUser().subscribe({
        next: (data: any) => {
          console.log(data)
          this.userData = data
          if (this.userData.user.id === this.id) {
            return true
          }
          return false
        },
        error: (error: any) => {
          console.log(error.error)
        }
      })
    });
  }



  public profileForm: FormGroup = new FormGroup  ({
  name: new FormControl('',  Validators.minLength(3)), //al menos tiene que tener 3 caracteres
  email: new FormControl({value:'', disabled: false},[Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)]),
  password: new FormControl('', [Validators.minLength(8),Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/) ])// Al menos 8 caracteres, Al menos 1 mayúscula, 1 minúscula y 1 número
  
})



handleUpdateProfileForm(){

  this.isSubmitted = true;

  console.log(this.profileForm.value)
  console.log(this.profileForm.valid)

  if(this.profileForm.valid) {

  this.authService.updateUser(this.profileForm.value).subscribe({

    next: (data: any) => {
      console.log(data)
      this.message = data.message
      alert(this.message)
   
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



  // me permite crear una nueva reseña, si el id del usuario es igual al id de alguna de las reseñas existentes en la BBDD entonces devuelve el error Ya ha hecho una reseña y  no permite crear la reseña lo que hace es ejecutar el método updateReview para actualizarla. 

  handlReviewForm() {

    this.isSubmitted = true;

    console.log(this.form.value)
    console.log(this.form.valid)

    if (this.form.valid) {

      this.authService.postReview(this.form.value).subscribe({

        next: (data: any) => {
          console.log(data)
          this.message = data.message
          alert('Gracias por su reseña, para nosotros es muy importante su opinión')
        },

        error: (error: any) => {
          console.log(error.error)
          if (error.error.message === 'El admin no puede hacer reseñas') {
            alert('el administraddor no puede realizar reseñas')
          }
          if (error.error.message === 'Ya ha hecho una reseña') {
        
            this.updateReview();
    
          }
          
        }

      })

    }
  }


  private updateReview() {
    this.authService.updateReview(this.form.value).subscribe({
      next: (data: any) => {
        console.log(data);
        this.message = data.message;
        alert('Gracias por enviarnos una nueva reseña, para nosotros es muy importante su opinión');
      },
      error: (error: any) => {
        console.error('Error al actualizar la reseña', error);
        alert('Los sentimos, no hemos podido recibir su reseña, por favor contacte con nosotros en el e-mail: code@coderestaurante.com, su opinión es importante para nosotros');
      },
    });
  }


  handleLogOut(){

  console.log('sesión cerrada')
  localStorage.removeItem('token')
  this.router.navigate(['auth/login']) //cambiar a /home cuando esté la ruta disponible

}


}







