import { ToastrService } from 'ngx-toastr';
import { AuthService } from './../../Services/auth.service';
import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrl: './reset-password.component.scss',
  standalone : false
})

export class ResetPasswordComponent {
  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router) { }

  errorMessage: string = '';
  successMessage: string = ''
    resetForm = new FormGroup({

    otp: new FormControl(null, Validators.required),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, Validators.required,),
  });

  register(data: FormGroup) {
    this._AuthService.resetPassword(data.value).subscribe({
      next: (res) => {
        console.log(res);
        this.resetForm.reset();
        this.successMessage = res.message;
      },
      complete: () => {
        if (this.successMessage) {
          this._ToastrService.success(this.successMessage, 'Success');
        }
        this._Router.navigate(['/LogIn']);
      },
    });
  }
}
