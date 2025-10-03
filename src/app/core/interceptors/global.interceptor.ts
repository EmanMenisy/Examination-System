import { HttpInterceptorFn } from '@angular/common/http';

export const globalInterceptor: HttpInterceptorFn = (req, next) => {

  let UrlLink = ""
  let token: string | null = null;
  if (typeof window !== 'undefined' && window.localStorage) {
    token = localStorage.getItem('accessToken');
  }

  if (req.url.includes('assets')) {
    if (typeof window === 'undefined') {
      UrlLink = 'http://localhost:4200/' + req.url.replace(/^\//, '');

    } else {
      UrlLink = req.url;
    }
  } else {
    UrlLink = 'https://upskilling-egypt.com:3005/api/' + req.url;
  }
  const myReq = req.clone({
    url: UrlLink,
    setHeaders: token
      ? { Authorization: `Bearer ${token}` }
      : {},
  });
  return next(myReq)
};
