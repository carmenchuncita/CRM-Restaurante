import { Component, OnInit } from '@angular/core';
import { inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { RegisterComponent } from '../../../auth/components/register/register.component';
import { LoginComponent } from '../../../auth/components/login/login.component';
import { TablesService } from '../../services/tables.service';
import { HoursService } from '../../services/hours.service';

@Component({
  selector: 'app-reservations',
  imports: [ReactiveFormsModule, RegisterComponent,LoginComponent],
  templateUrl: './reservations.component.html',
  styleUrl: './reservations.component.css'
})


export class ReservationsComponent {



  public FormBuilder: FormBuilder = inject(FormBuilder);
  private tablesService: TablesService = inject(TablesService);
  private hoursServiceService: HoursService = inject(HoursService);
  public tables: any = {};
  public hours: any = {};


  OnInit(){

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


  }

      public form: FormGroup = new FormGroup({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      date: new FormControl('', Validators.required),
      hour: new FormControl('', Validators.required),
      guests: new FormControl('', Validators.required)
      
    })

    handleReservationForm(){

      console.log('funciono')


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




