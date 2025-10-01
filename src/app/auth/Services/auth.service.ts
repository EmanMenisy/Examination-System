import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import {jwtDecode} from "jwt-decode";
import { IregisterReq, IRegisterRes } from '../interfaces/IRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  Identity(res: any) {

    if (res.data.accessToken) {
      localStorage.setItem('accessToken', res.data.accessToken);
    }
    if (res.data.refreshToken) {
      localStorage.setItem('refreshToken', res.data.refreshToken);
    }

    if (res.data.profile) {
      localStorage.setItem('First', res.data.profile.first_name);
      localStorage.setItem('Last', res.data.profile.last_name);
      localStorage.setItem('Email', res.data.profile.email);
      localStorage.setItem('Status', res.data.profile.status);
    }

    const encoded: any = localStorage.getItem('accessToken');
    if (encoded) {
      const decoded: any = jwtDecode(encoded);
      console.log("decoded token:", decoded);

      localStorage.setItem('Role', decoded.role);
      localStorage.setItem('UserId', decoded.sub);
    }
  }

  constructor(private _HttpClient: HttpClient, private _router: Router) { }

  Register(data: IRegisterReq): Observable<IRegisterRes> {
    return this._HttpClient.post<IRegisterRes>('auth/register', data)
  }
  LogIn(data: any): Observable<any> {
    return this._HttpClient.post('auth/login', data)
  }
  changePassword(data: any): Observable<any> {
    return this._HttpClient.post('auth/change-password', data)
  }
  resetPassword(data: any): Observable<any> {
    return this._HttpClient.post('auth/reset-password', data)
  }
  forgetPassword(data: any): Observable<any> {
    return this._HttpClient.post('auth/forgot-password', data)
  }

  LogOut() {
    localStorage.clear()
  }
}

