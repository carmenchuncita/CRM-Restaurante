import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  constructor(private http: HttpClient) {}

  getAvailableMenuForToday() {
    const today = new Date().toLocaleString('en-us', { weekday: 'long' }).toLowerCase();
    return this.http.get(`http://localhost:5500/api/menu/day?day=${today}&isAvailable=true`);
  }
}
