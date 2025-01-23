import { HttpInterceptorFn } from '@angular/common/http';

export const tokenInterceptor: HttpInterceptorFn = (req, next) => {


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
