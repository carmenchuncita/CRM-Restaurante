import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

localStorage.setItem('redirectUrl', state.url)

  const authService: AuthService = inject(AuthService)
  const $authService = authService.verifyToken()
  const router: Router =inject(Router)

  
 return $authService.pipe(
  
  map((data) => {
  console.log(data)
  return data.verified
}),
catchError((err)=>{
  if(err.error.message === 'Token expired'){
    alert('Su sesión a expirado, por favor vuelva a inicar sesión')
  }

  router.navigate(['auth/login'])
  return of (false) // siempre dentro de un of el false
})

 )

};
