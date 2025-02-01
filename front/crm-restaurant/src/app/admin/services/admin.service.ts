import { HttpClient,HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

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
  getAllReservations() {
    return this.http.get('http://localhost:5500/api/reservation/getReservations');
  }
  getAllReviews() {
    return this.http.get('http://localhost:5500/api/users/getReviews');
  }
  getAllTables() {
    return this.http.get('http://localhost:5500/api/mesa/todas')
  }
}
