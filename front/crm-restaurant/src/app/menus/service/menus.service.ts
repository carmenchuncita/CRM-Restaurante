import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MenusService {
  private http: HttpClient = inject(HttpClient);

  constructor() { }

  getAllMenus() {
    return this.http.get('http://localhost:5500/api/menus/getAllMenus');
  }
}
