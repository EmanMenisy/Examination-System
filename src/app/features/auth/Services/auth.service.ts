import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import { jwtDecode } from "jwt-decode";
import { IRegisterReq, IRegisterRes, IRestPassReq, IRestPassRes } from '../interfaces/IRegister';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private userSubject = new BehaviorSubject<any>(null);

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
      // Emit the user profile to the BehaviorSubject
      this.userSubject.next(res.data.profile);
      localStorage.setItem('user', JSON.stringify(res.data.profile));
    }

    const encoded: any = localStorage.getItem('accessToken');
    if (encoded) {
      const decoded: any = jwtDecode(encoded);
      console.log("decoded token:", decoded);
      localStorage.setItem('Role', decoded.role);
      localStorage.setItem('UserId', decoded.sub);
    }
  }

  constructor(private _HttpClient: HttpClient, private _router: Router) {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      this.userSubject.next(JSON.parse(storedUser));
    }
  }

  get currentUser() {
    return this.userSubject.value;
  }
  get getUserData() {
    return this.userSubject.asObservable();
  }
  Register(data: IRegisterReq): Observable<IRegisterRes> {
    return this._HttpClient.post<IRegisterRes>('auth/register', data)
  }
  LogIn(data: any): Observable<any> {
    return this._HttpClient.post('auth/login', data)
  }
  changePassword(data: any): Observable<any> {
    return this._HttpClient.post('auth/change-password', data)
  }
  resetPassword(data: IRestPassReq): Observable<IRestPassRes> {
    return this._HttpClient.post<IRestPassRes>('auth/reset-password', data)
  }
  forgetPassword(data: any): Observable<any> {
    return this._HttpClient.post('auth/forgot-password', data)
  }

  updateProfileStudent(data: any): Observable<any> {
    return this._HttpClient.put('student', data)
  }
  updateProfileInstructor(data: any): Observable<any> {
    return this._HttpClient.put('instructor', data)
  }
  LogOut() {
    localStorage.clear()
    this.userSubject.next(null);
  }
}

