import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  const Url = 'https://upskilling-egypt.com:3005/api/'
  const myReq = req.clone({
    url: Url + req.url,
    setHeaders: {
      Authorization: `${localStorage.getItem('userToken')}`,
    },
    
  });
  return next(myReq)
};
