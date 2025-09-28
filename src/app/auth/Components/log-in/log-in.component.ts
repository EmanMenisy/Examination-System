import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormControl, FormGroup } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.component.html',
  styleUrl: './log-in.component.scss',
  standalone : false
})
export class LogInComponent{

 constructor(private _AuthService:AuthService , private _ToastrService:ToastrService , private _Router:Router) {}

  LoginForm = new FormGroup({
    email: new FormControl(null),
    password : new FormControl(null),
  })


  login(LoginForm : FormGroup){
    this._AuthService.LogIn(LoginForm.value).subscribe({
      next:(res)=>{
        console.log(res)
        localStorage.setItem('accessToken' , res.data.accessToken)
      },
      complete:()=>{
        this._ToastrService.success('you have been login successfully')
        this._Router.navigate(['/dashboard'])
      }
    })
    
  }

}
