import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class MenusService {
  private apiUrl = 'http://localhost:5500/api/menu';

  constructor(public http: HttpClient) {}

  getAvailableMenuForToday() {
    const today = new Intl.DateTimeFormat('en-US', {
      weekday: 'long',
      timeZone: 'Europe/Paris'
    }).format(new Date()).toLowerCase();

    return this.http.get(`${this.apiUrl}/day?day=${today}&isAvailable=true`);
  }
}
