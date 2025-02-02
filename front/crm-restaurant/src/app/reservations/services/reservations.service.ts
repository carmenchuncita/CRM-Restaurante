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


  /*createReservationClient(form: any){

    return this.http.post('http://localhost:5500/api/reservation/postReservationClient', form)

  }*/


}


