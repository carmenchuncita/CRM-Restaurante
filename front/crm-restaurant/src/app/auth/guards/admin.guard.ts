import { CanActivateFn, Route, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';
import Swal from 'sweetalert2';

export const adminGuard: CanActivateFn = (route, state) => {


  const authService: AuthService = inject(AuthService)
  const $authService = authService.verifyRole()
  const router: Router = inject(Router)


  return $authService.pipe(

    map((data: any) => {
      console.log(data)
      if (data?.user?.role === 'admin') {
        return true
      }

      router.navigate(['auth/login'])
      Swal.fire({
        title: 'Ruta protegida',
        text: 'Lo sentimos, esta ruta está protegida y no permite el acceso a la información que contiene',
        background: '#f7f7f7',
        color: '#282826',
        confirmButtonColor: '#d4e157',
        confirmButtonText: 'Close',
        customClass: {
          popup: 'custom-swal-popup',
        }
      });
      return false

    }),
    catchError((err) => {
      console.error('Error en la protección de rutas:', err);
      router.navigate(['auth/login'])
      Swal.fire({
        title: 'Ruta protegida',
        text: 'Lo sentimos, esta ruta está protegida y no permite el acceso a la información que contiene',
        background: '#f7f7f7',
        color: '#282826',
        confirmButtonColor: '#d4e157',
        confirmButtonText: 'Close',
        customClass: {
          popup: 'custom-swal-popup',
        }
      });
      return of(false)

    })
  )

};
