import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private http: HttpClient = inject(HttpClient)
  private router: Router = inject(Router);

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

  profileUser(): Observable<any> {
    const id = localStorage.getItem('id');
    console.log(id);
    if (!id) {
      console.error('No se encontró el ID en el localStorage');
      return of (null); // O manejar el caso según la lógica de tu aplicación
    }
    // Envía el id como un parámetro de consulta
   return this.http.get('http://localhost:5500/api/users/profile', {
    params: { id }
  })

}


updateUser(profileForm: any): Observable<any> {
  const id = localStorage.getItem('id');
    console.log(id);
 return this.http.put(`http://localhost:5500/api/users/updateUser/${id}`, profileForm) 

}

  postReview(reviewForm: any) : Observable<any>  {
    return this.http.post('http://localhost:5500/api/users/postReview/', reviewForm )
    
  }

  updateReview(reviewData: any) : Observable<any>  {
    return this.http.put('http://localhost:5500/api/users/updateReview/', reviewData )
    
  }
  


}