import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ReservationsService {

  private http: HttpClient = inject(HttpClient);

  createReservationClient(form: any) {

    return this.http.post('http://localhost:5500/api/reservation/postReservationClient', form)

  }

}

