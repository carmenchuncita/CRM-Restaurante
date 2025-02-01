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

  //evento click del botton editar del profile data para mostrarlo solo cuanto se produce el eventoclik 

  clickUpdateProfile(){
    this.updateProfileIsActive = !this.updateProfileIsActive
    console.log(this.updateProfileIsActive)
  }

  //formulario y método para actualizar los datos del usurio (nombre y password) el mail está desactivado para que no se cambie

  public profileForm: FormGroup = new FormGroup  ({
  name: new FormControl(this.userData?.user?.name || '',   Validators.minLength(3)), //al menos tiene que tener 3 caracteres
  email: new FormControl({value:'', disabled: true}, (Validators.pattern(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/))),
  password: new FormControl('', [Validators.minLength(8), Validators.pattern(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).{8,}$/) ])// Al menos 8 caracteres, Al menos 1 mayúscula, 1 minúscula y 1 número
  
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
      alert('No ha indicado ningún cambio');
      this.updateProfileIsActive = !this.updateProfileIsActive;

      return;
    }

    this.authService.updateUser(formData).subscribe({
      next: (data: any) => {
        console.log(data);
        this.message = data.message;
        if (formData.name) this.userData.user.name = formData.name;
        alert(this.message);
        this.updateProfileIsActive = !this.updateProfileIsActive;
      },
      error: (error: any) => {
        console.error('Error en la ejecución del registro', error);
        if (error.error.message === 'El correo electrónico ya está registrado') {
          alert('Ya existe una cuenta con esta dirección de e-mail.');
          this.router.navigate(['/auth/login']);
        }
        this.errorMessage = error.error.message;
      },
    });
  }
}

  // me permite crear una nueva reseña, si el id del usuario es igual al id de alguna de las reseñas existentes en la BBDD entonces devuelve el error Ya ha hecho una reseña y  no permite crear la reseña lo que hace es ejecutar el método updateReview para actualizarla. 

  handlReviewForm() {

    this.isSubmittedReview = true;

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


  // metodo para actualizar el reseña, cuando el usuario ya tiene una reseña no puede realizar una nueva, si no que actualiza la que ya tenía
updateReview() {
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

  // método para el LogOut del usuario que redirege a la home

  handleLogOut(){

  console.log('sesión cerrada')
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('id')
  localStorage.removeItem('role')
  this.router.navigate(['/home']) 

}

}







