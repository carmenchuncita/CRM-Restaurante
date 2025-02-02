import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { RegisterComponent } from '../../../auth/components/register/register.component';
import { LoginComponent } from '../../../auth/components/login/login.component';
import { TablesService } from '../../services/tables.service';
import { HoursService } from '../../services/hours.service';
import { ReservationsService } from '../../services/reservations.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { ValidatorFn, AbstractControl, ValidationErrors } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-reservations',
  imports: [ReactiveFormsModule, RegisterComponent, LoginComponent, CommonModule],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})

export class ReservationsComponent {
  private tablesService: TablesService = inject(TablesService);
  private reservationService: ReservationsService = inject(ReservationsService);
  private router: Router = inject(Router);
  public tables: any = {};
  public hours: any = {};
  public isSubmitted: boolean = false;
  private message: string = '';
  public errorMessage: boolean = false;
  public token = localStorage.getItem('token');
  public isSubmittedLogin: boolean = false;
  public isSubmittedRegister: boolean = false;
  public dateMin: string = '';
  public tableList: any [] = [];
  public tableName: any [] = [];

  ngOnInit() {

    this.tablesService.getAllTables().subscribe({
      next: (data: any) => {
        console.log(data)
        this.tableList = data;
        /*this.tableName = data.map((mesa: any) => mesa.nombre); // Extraer los nombres
        console.log(this.tableName);*/
       
      
      },
      error: (error: any) => {
        console.log(error);
      },
    });

    // Guardamos la URL actual (ruta) en el localStorage cuando accedes al componente
    localStorage.setItem('redirectUrl', window.location.pathname);

    // Obtener la fecha actual en formato YYYY-MM-DD
    this.dateMin = new Date().toISOString().split('T')[0];

    // Establecer el valor mínimo para la fecha en el formulario
    this.form.controls['date'].setValidators([
      Validators.required,
      this.minDateValidator(this.dateMin),
    ]);
  }

  minDateValidator(minDate: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      if (control.value && control.value < minDate) {
        return { minDate: true }; // Error si la fecha es menor a la mínima permitida
      }
      return null; // Válido si está en el rango permitido
    };
  }

  public form: FormGroup = new FormGroup({
    table: new FormControl('', Validators.required),
    date: new FormControl('', Validators.required),
    time: new FormControl('', Validators.required),
    telefono: new FormControl('', Validators.required),
  });

  handleReservationForm() {
    console.log('funciono');

    this.isSubmitted = true;

    console.log(this.form.value);
    console.log(this.form.valid);

    if (this.token && this.form.valid) {
      this.reservationService
        .createReservationClient(this.form.value)
        .subscribe({
          next: (data: any) => {
            console.log(data);
            this.message = data.message;
            Swal.fire({
              title: 'Reserva confirmada',
              text: 'Recibirá un email con los datos de su confirmación',
              background: '#f7f7f7',
              color: '#282826',
              confirmButtonColor: '#d4e157',
              confirmButtonText: 'Close',
              customClass: {
                popup: 'custom-swal-popup',
              },
            });
            this.router.navigate(['/home']);
          },

          error: (error: any) => {
            console.error('Error en la ejecución del registro', error);


            if (error.error.message === 'Ya hay una reserva en ese momento') {
              Swal.fire({
                title: this.message,
                text: 'Los sentimos, no hay disponibilidad, por favor, elija un turno, fecha, o mesa diferentes',
                background: '#f7f7f7',
                color: '#282826',
                confirmButtonColor: '#d4e157',
                confirmButtonText: 'Close',
                customClass: {
                  popup: 'custom-swal-popup',
                },
              });
            }
            // Validaciones específicas del backend
            if (error.error.message=== 'Error al crear la reserva') {
              Swal.fire({
                title: this.message,
                text: 'Los sentimos, no hemos podido recibir su reserva, por favor contacte con nosotros en el e-mail: code@coderestaurante.com o teléfono: +34 609 77 44 55, su opinión es importante para nosotros',
                background: '#f7f7f7',
                color: '#282826',
                confirmButtonColor: '#d4e157',
                confirmButtonText: 'Close',
                customClass: {
                  popup: 'custom-swal-popup',
                },
              });
            }

            this.errorMessage = error.error.message;
          },
        });
    } else {
      console.log('no hay token');
    }
  }

  handleSummitedLogin() {
    this.isSubmittedLogin = true;
    this.isSubmittedRegister = false;
  }

  handleSummitedRegister() {
    this.isSubmittedRegister = true;
    this.isSubmittedLogin = false;
  }
}

/*get controlName(){
  return this.form.get('name') 
}
get controlEmail(){
  return this.form.get('email') 
}
get controlPhone(){
  return this.form.get('phone') 
}
get controlDate(){
  return this.form.get('date') 
}
get controlHour(){
  return this.form.get('hour') 
}
get controlGuests(){
  return this.form.get('guests') 
}

addBooking() {

}*/
