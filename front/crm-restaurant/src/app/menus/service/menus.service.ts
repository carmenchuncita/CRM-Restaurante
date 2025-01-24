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

  getMenu(id: string) {
    return this.http.get('http://localhost:5500/api/menus/getMenuById/' + id)

  }

  postMenu(menu: any) {
    return this.http.post('http://localhost:5500/api/menus', menu);
  }

  putMenu(id: string, menu: any) {
    return this.http.put(`http://localhost:5500/api/menus/${id}`, menu);
  }

  deleteMenu(id: string) {
    return this.http.delete(`http://localhost:5500/api/menus/${id}`);
  }
}
