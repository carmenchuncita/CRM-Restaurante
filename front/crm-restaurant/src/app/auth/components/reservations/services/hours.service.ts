import { inject, Injectable } from '@angular/core';
import { first } from 'rxjs';
import { IHour } from '../models/hour.model';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  //private URL_BASE = `${this.baseUrl}/hours`

  private http = inject(HttpClient);

  getHours(){ //corroborar rutas
    return this.http.get('http://localhost:5500/api/reservas/getHours').pipe(first())
  }
}
