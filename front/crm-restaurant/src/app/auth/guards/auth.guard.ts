import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { catchError, map, of } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  /*guardamos en logcalStorage la url donde nos encontramos para poderlo usar y  que se rediriga de nuevo a ella una vez echo el login*/
  localStorage.setItem('redirectUrl', state.url)

  const authService: AuthService = inject(AuthService)
  const $authService = authService.verifyToken()
  const router: Router = inject(Router)

 /*Utilizamos RXJS y el operador pipe que nos permite que las respuestas se manipulen de manera eficiente antes de ser devueltas como un Observable.*/ 
  return $authService.pipe(
/*map para modificar los datos antes de que lleguen a los suscriptores.*/ 
    map((data) => {
      console.log(data)
      return data.verified
    }),

    catchError((err) => {

      if (err.error.message === 'No hay token') {
        alert('Es nesario que inicie sesion para acceder a esta ruta')
      }
      console.log(err.error.message)

      if (err.error.message === 'Token expired') {
        alert('Su sesión a expirado, por favor vuelva a inicar sesión')
      }
      router.navigate(['auth/login'])
      return of(false)
    })

  )

};
