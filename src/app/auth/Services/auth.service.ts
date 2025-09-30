import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IRegisterRes , IregisterReq } from '../interfaces/Iregister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient: HttpClient) { }

  Register(data: IregisterReq): Observable<IRegisterRes> {
    return this._HttpClient.post<IRegisterRes>('api/auth/register', data)
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

  }
}
