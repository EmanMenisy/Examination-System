import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { IRole } from '../../interfaces/IRegister';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
  standalone: false
})

export class RegisterComponent {

  constructor(private _AuthService: AuthService, private _ToastrService: ToastrService, private _Router: Router) { }

  errorMessage: string = '';
  successMessage: string = ''



  roles: IRole[] = [
    { name: 'Student', value: 'Student' },
    { name: 'Instructor', value: 'Instructor' },
  ];



  registerForm = new FormGroup({
    first_name: new FormControl(null, [Validators.required]),
    last_name: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    password: new FormControl(null, [Validators.required,]),
    role: new FormControl(null, [Validators.required]),
  });

  register(data: FormGroup) {
    this._AuthService.Register(data.value).subscribe({
      next: (res) => {
        this.registerForm.reset();
        this.successMessage = res.message;
      },
      complete: () => {
        if (this.successMessage) {
          this._ToastrService.success(this.successMessage, 'Success');
          this._Router.navigate(['/LogIn']);
        }
      },
    });
  }

}
