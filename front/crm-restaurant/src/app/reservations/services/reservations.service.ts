import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private http: HttpClient = inject(HttpClient);

  createReservationClient(form: any): Observable<any>{
    const id = localStorage.getItem('id'); 
    console.log(id);
    if (!id) {
      console.error('No se encontró el ID en el localStorage');
      return of (null); // O manejar el caso según la lógica de tu aplicación
    }

    return this.http.post('http://localhost:5500/api/reservation/postReservationClient', form, {
      params: { id }
    })
  }

  getReservations(): Observable<any>{
    const id = localStorage.getItem('id');
    console.log(id);
    if (!id) {
      console.error('No se encontró el ID en el localStorage');
      return of (null); // O manejar el caso según la lógica de tu aplicación
    }

    return this.http.get('http://localhost:5500/api/reservation/getReservations', {
      params: { id }
    })
  }


  deleteReservation(id:string): Observable<any>{
    return this.http.put('http://localhost:5500/api/reservation/deleteReservation', {
      id
    })
  }

}


