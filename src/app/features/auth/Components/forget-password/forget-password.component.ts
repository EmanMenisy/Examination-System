import { Component } from '@angular/core';
import { AuthService } from '../../Services/auth.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
  standalone: false,
})
export class ForgetPasswordComponent {
  constructor(
    private auth: AuthService,
    private toast: ToastrService,
    private route: Router
  ) {}

  forgotten = new FormGroup({
    email: new FormControl(null, [Validators.required, Validators.email]),
  });

Reminder() {
  if (this.forgotten.invalid) return;

  this.auth.forgetPassword(this.forgotten.value).subscribe({
    next: (res) => {
      console.log(res);
    },

    error: (err) => {

     this.toast.error(
        err.error?.message || 'Something went wrong, please try again!',
        'Error'
      );
    },

    complete: () => {
      this.toast.success('Check Your Inbox For An OTP', 'Email Found!');
      this.route.navigate(['/ResetPassword']);
    },

  });


}
}
