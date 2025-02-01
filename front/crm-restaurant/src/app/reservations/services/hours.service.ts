import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HoursService {

  private http: HttpClient= inject(HttpClient)

  
  getAllHours() {
    return this.http.get('http://localhost:4500/api/mesa/todas')
  }
}
