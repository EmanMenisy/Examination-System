import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private _HttpClient:HttpClient) { }

  Register(data:any):Observable<any>{
    return this._HttpClient.post('auth/register' , data)
  }
  LogIn(data:any):Observable<any>{
    return this._HttpClient.post('auth/login' , data)
  }
  changePassword(data:any):Observable<any>{
    return this._HttpClient.post('auth/change-password' , data)
  }
  resetPassword(data:any):Observable<any>{
    return this._HttpClient.post('auth/reset-password' , data)
  }
  forgetPassword(data:any):Observable<any>{
    return this._HttpClient.post('auth/forgot-password' , data)
  }
  
  LogOut(){
    
  }
}
