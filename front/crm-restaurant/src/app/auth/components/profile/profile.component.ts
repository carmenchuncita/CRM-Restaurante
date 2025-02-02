import { ReservationsService } from './../../../reservations/services/reservations.service';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { Component, inject } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-profile',
  imports: [ReactiveFormsModule, DatePipe],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.css'
})
export class ProfileComponent {

 
  private activatedRoute: ActivatedRoute = inject(ActivatedRoute)
  private authService: AuthService = inject(AuthService)
  private reservationsService: ReservationsService = inject(ReservationsService)
  private router: Router = inject(Router)

  public id!: string;
  public updateProfileIsActive: boolean = false;
  public userData: any = { user: {} };
  public isSubmittedUpdate: boolean = false;
  public isSubmittedReview: boolean = false;
  public isSubmittedReservationList: boolean = false;
  public isSubmittedReviews: boolean = false;
  private message: string = ''
  public errorMessage: string = ''
  public reservationsList: any[] = [];

  

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

   this.reservationsService.getReservations().subscribe({
    next: (data:any) => {
      console.log(data)
      localStorage.setItem('id_reservation', data.id)
    
      this.reservationsList = data  
      
     
    },
    error: (error:any) => {
      console.log(error.error)
    }

   })

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
}








clickShowReservation(){
  this.isSubmittedReservationList = !this.isSubmittedReservationList
  console.log(this.isSubmittedReservationList)

}



// Función que verifica si la fecha de la reserva ya ha pasado o es hoy
isReviewAllowed(reservationDate: string): boolean {
  const today = new Date(); // Obtener la fecha actual
  today.setHours(0, 0, 0, 0);  // Normalizar la fecha actual a las 00:00:00 para no considerar las horas
  
  const resDate = new Date(reservationDate); // Obtener la fecha de la reserva
  resDate.setHours(0, 0, 0, 0);  // Normalizar la fecha de la reserva a las 00:00:00 para no considerar las horas
  
  // Comparar si la fecha de la reserva es igual o posterior a la fecha actual
  return resDate <= today;  // El icono se activa si la fecha de la reserva ya pasó o es hoy
}



clickShowReviews(){
  
  this.isSubmittedReviews = !this.isSubmittedReviews
  console.log(this.isSubmittedReviews)

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
          Swal.fire({
            title: this.message, 
            text: 'Gracias por su reseña, para nosotros es muy importante su opinión', 
            background: '#f7f7f7',
            color: '#282826',
            confirmButtonColor: '#d4e157',
            confirmButtonText: 'Close',
            customClass: {
              popup: 'custom-swal-popup',
            }
          });
          
          
        },

        error: (error: any) => {
          console.log(error.error)
          if (error.error.message === 'El admin no puede hacer reseñas') {
            Swal.fire({
              title: this.message, 
              text: 'El administraddor no puede realizar reseñas', 
              background: '#f7f7f7',
              color: '#282826',
              confirmButtonColor: '#d4e157',
              confirmButtonText: 'Close',
              customClass: {
                popup: 'custom-swal-popup',
              }
            });
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
        Swal.fire({
          title: this.message, 
          text: 'Gracias por enviarnos una nueva reseña, para nosotros es muy importante su opinión', 
          background: '#f7f7f7',
          color: '#282826',
          confirmButtonColor: '#d4e157',
          confirmButtonText: 'Close',
          customClass: {
            popup: 'custom-swal-popup',
          }
        });
      },
      error: (error: any) => {
        console.error('Error al actualizar la reseña', error);
        Swal.fire({
          title: this.message, 
          text: 'Los sentimos, no hemos podido recibir su reseña, por favor contacte con nosotros en el e-mail: code@coderestaurante.com, su opinión es importante para nosotros', 
          background: '#f7f7f7',
          color: '#282826',
          confirmButtonColor: '#d4e157',
          confirmButtonText: 'Close',
          customClass: {
            popup: 'custom-swal-popup',
          }
        });
      },
    });
  }


  // elminar reservas

  handleCancelReservation(id:string, idx:any){

    this.reservationsService.deleteReservation(id).subscribe({
      next: (data:any) => {
        console.log(data)
        
       
      },
      error: (error:any) => {
        console.log(error.error)
      }

    })
    console.log(idx)
    this.reservationsList = this.reservationsList.filter((reserva: any, index) => index !== idx)

  }

  // método para el LogOut del usuario que redirege a la home

  handleLogOut(){

  console.log('sesión cerrada')
  localStorage.removeItem('token')
  localStorage.removeItem('email')
  localStorage.removeItem('id')
  localStorage.removeItem('role')
  localStorage.removeItem('id_reservation')
  this.router.navigate(['/home']) 
}

}







