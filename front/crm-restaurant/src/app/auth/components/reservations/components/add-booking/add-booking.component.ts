import { HoursService } from './../../services/hours.service';
import { TablesService } from './../../services/tables.service';
import { DatePipe, NgClass } from '@angular/common';
import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { ITables } from '../../models/tables.model';
import { IHour } from '../../models/hour.model';

@Component({
  selector: 'app-add-booking',
  imports: [ReactiveFormsModule, NgClass],
  templateUrl: './add-booking.component.html',
  styleUrl: './add-booking.component.css',
  providers: [
    DatePipe
  ]
})
export class AddBookingComponent {

  public FormBuilder: FormBuilder = inject(FormBuilder);
  public datePipe: DatePipe = inject(DatePipe);
  private TablesService: TablesService = inject(TablesService);
  private HoursServiceService: HoursService = inject(HoursService);

  public form: FormGroup = new FormGroup({});
  public tables: any = {};
  public hours: any = {};

  ngOnInit(){

    this.form = this.FormBuilder.group({
      name: new FormControl('', Validators.required),
      email: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required),
      date: new FormControl(this.datePipe.transform(new Date(),'dd-MM-yyyy'), Validators.required),
      hour: new FormControl('', Validators.required),
      guests: new FormControl('', Validators.required)
      
    })

    this.TablesService.getTables().subscribe({
      next: (tables: any) => {
        this.tables = tables;
        //this.controlGuests?.setValue(tables[0].value);

      }
    })

    this.HoursServiceService.getHours().subscribe({
      next: (hours: any) => {
        this.hours = hours;
        //this.controlGuests?.setValue(tables[0].value);

      }
    })

  }

  get controlName(){
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

  }

}
