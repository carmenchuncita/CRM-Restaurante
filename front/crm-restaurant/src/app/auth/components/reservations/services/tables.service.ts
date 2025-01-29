import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ITables } from '../models/tables.model';
import { first } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TablesService {

  private http: HttpClient = inject(HttpClient);

  getTables(){ //corroborar rutas
    return this.http.get('http://localhost:5500/api/mesa/getMesas').pipe(first())
  }

  

  constructor() { }
}
