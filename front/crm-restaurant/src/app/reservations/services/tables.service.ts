import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

 private http: HttpClient= inject(HttpClient)

  
  getAllTables() {
    return this.http.get('http://localhost:4500/api/mesa/todas')
  }
}
