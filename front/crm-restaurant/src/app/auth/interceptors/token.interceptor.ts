import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {

  /*Agregamos al headers el token de autenticación en todas las peticiones que salgan de nuestra aplicación*/

  const token = localStorage.getItem('token');

  if(token) {

    try{
      req = req.clone ({
        headers: req.headers.set('Authorization', `Bearer ${token}`),
      })
    }catch(error){
      console.log(error)
    }
  }
  return next(req);
  
};
