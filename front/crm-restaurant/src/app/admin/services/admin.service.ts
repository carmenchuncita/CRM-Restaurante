import { HttpClient,HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class AdminService {
  private http: HttpClient = inject(HttpClient);

  postMenu(menu: any) {
    return this.http.post('http://localhost:5500/api/menu/create', menu);
  }

  deleteMenu(id: string) {
    return this.http.delete(`http://localhost:5500/api/menu/${id}`)
  }

  updateMenu(id: string, usertoUpdate: any) {
    return this.http.put(`http://localhost:5500/api/menu/${id}`, usertoUpdate)
  }
  getMenus() {
    return this.http.get('http://localhost:5500/api/menu/');
  }
  getReservations(): Observable<any>{
    const id = localStorage.getItem('id');
    if (!id) {
      console.error('No se encontró el ID en el localStorage');
      return of (null);
    }

    return this.http.get('http://localhost:5500/api/reservation/getReservations', {
      params: { id }
    })
  }
  getAllReviews() {
    return this.http.get('http://localhost:5500/api/users/getReviews');
  }
  getAllTables() {
    return this.http.get('http://localhost:5500/api/mesa/todas')
  }
  postTable(table: any) {
    return this.http.post('http://localhost:5500/api/mesa/create', table);
  }
  createTables() {
    return this.http.get('http://localhost:5500/api/mesa/createMesa')
  }
  updateTable(id: string, usertoUpdate: any) {
    return this.http.put(`http://localhost:5500/api/mesa/${id}`, usertoUpdate)
  }
  deleteTable(id: string) {
    return this.http.delete(`http://localhost:5500/api/mesa/${id}`)
  }
}
