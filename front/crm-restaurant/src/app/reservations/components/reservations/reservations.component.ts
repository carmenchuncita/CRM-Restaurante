import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { RegisterComponent } from '../../../auth/components/register/register.component';
import { LoginComponent } from '../../../auth/components/login/login.component';
import { TablesService } from '../../services/tables.service';
import { HoursService } from '../../services/hours.service';
import { DatePipe } from '@angular/common';
import { ReservationsService } from '../../services/reservations.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reservations',
  imports: [ReactiveFormsModule, RegisterComponent,LoginComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})


export class ReservationsComponent {

  private tablesService: TablesService = inject(TablesService);
  private hoursServiceService: HoursService = inject(HoursService);
  private reservationService: ReservationsService = inject(ReservationsService)
  private router: Router = inject(Router);
  public tables: any = {};
  public hours: any = {};
  public isSubmitted: boolean = false;
  private message: string = '';
  public errorMessage: boolean = false;
  public token = localStorage.getItem('token');
  public isSubmittedLogin: boolean = false;
  public isSubmittedRegister: boolean = false;
  


 /* OnInit(){

    this.tablesService.getAllTables().subscribe({
      next: (tables: any) => {
        this.tables = tables;
        //this.controlGuests?.setValue(tables[0].value);

      }
    })

    this.hoursServiceService.getAllHours().subscribe({
      next: (hours: any) => {
        this.hours = hours;
        //this.controlGuests?.setValue(tables[0].value);

      }
    })


  }*/

      public form: FormGroup = new FormGroup({
      client: new FormControl('', Validators.required),
      table: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      time: new FormControl('', Validators.required)
      
    })

    handleReservationForm(){

      console.log('funciono')


        this.isSubmitted = true;
    
        console.log(this.form.value);
        console.log(this.form.valid);
    
        if(this.token && this.form.valid) {

          this.reservationService.createReservationClient(this.form.value).subscribe({

            next: (data: any) => {
              console.log(data)
              this.message = data.message
              alert(this.message)
              this.router.navigate(['/home'])

           
            },
      
            error: (error: any) => {
              console.error('Error en la ejecución del registro', error);
      
                // Validaciones específicas del backend
                if (error.error.message === 'Error al crear la reserva') {
                  alert('error al crear la reserva')
                }
              
                this.errorMessage = error.error.message;
             
            }
          })
        
        } else {
      
          console.log('no hay token')
        }

         
        }

         
        handleSummitedLogin(){

          this.isSubmittedLogin  = true;
          this.isSubmittedRegister = false;

        }

        handleSummitedRegister(){

          this.isSubmittedRegister = true;
          this.isSubmittedLogin  = false;
          
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




