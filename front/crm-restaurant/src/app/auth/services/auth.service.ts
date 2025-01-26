import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)

  registerUser(userForm: any) : Observable<any>  {
    return this.http.post('http://localhost:5500/api/users/register', userForm)
  }

  loginUser(userLoginForm: any) {
    return this.http.post('http://localhost:5500/api/users/login', userLoginForm)
  }

  ProfileUser(userLoginForm: any) : Observable<any>  {
    return this.http.post('http://localhost:5500/api/users/profile', userLoginForm)

  }

  verifyToken() : Observable<any> {
    return this.http.get('http://localhost:5500/api/users/verify-token')

  }

  verifyRole(): Observable<any>  {
    const email = localStorage.getItem('email')
    console.log(email)
    return this.http.post('http://localhost:5500/api/users/verify-role', {email})
  }

  profileUser(): Observable<any>  {
    const id = localStorage.getItem('id')
    console.log(id)
    return this.http.post('http://localhost:5500/api/users/profile', {id})
  }

}
