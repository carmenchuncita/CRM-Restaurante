import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const adminGuard: CanActivateFn = (route, state) => {


  const authService: AuthService = inject(AuthService)
  const $authService = authService.verifyRole()
  const router: Router =inject(Router)

  
 return $authService.pipe(
  
  map((data: any) => {
    console.log(data)
  if(data?.user?.role === 'admin'){
    return true
  }

  router.navigate(['auth/login'])
  alert('lo sentimos, esta ruta está protegida y no permite el acceso a la información que contiene')
  return false
  
}),
catchError((err)=>{
  console.error('Error en la protección de rutas:', err);
  router.navigate(['auth/login'])
  alert('lo sentimos, esta ruta está protegida y no permite el acceso a la información que contiene')
  return of(false) 
 
})
 )

};
