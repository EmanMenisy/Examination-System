import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  const Url = 'https://upskilling-egypt.com:3005/api/'
  let token: string | null = null;

  if (typeof window !== 'undefined' && window.localStorage) {
     token = localStorage.getItem('accessToken');
  }
  const myReq = req.clone({
  url: Url + req.url,
  setHeaders: token
      ? { Authorization: `Bearer ${token}` } 
      : {},
  });
  return next(myReq)
};
