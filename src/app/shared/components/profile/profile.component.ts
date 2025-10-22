import { ChangePasswordComponent } from './../../../features/auth/Components/change-password/change-password.component';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../../features/auth/Services/auth.service';
import { SharedModule } from '../../shared.module';
import { TabsModule } from 'primeng/tabs';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MessageComponent } from "../message/message.component";
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-profile',
  imports: [SharedModule, TabsModule, MessageComponent],
  templateUrl: './profile.component.html',
  styleUrl: './profile.component.scss'
})
export class ProfileComponent implements OnInit {
  constructor(private authService: AuthService ,private router: Router ,private tostar: ToastrService) { }
  user: any
  value: number = 0;
  ngOnInit() {
    this.getData();
  }

  updateForm = new FormGroup({
    first_name: new FormControl('', Validators.required),
    last_name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
  });

  changeForm = new FormGroup({
    password: new FormControl('', Validators.required),
    password_new: new FormControl('', Validators.required),
  });

  getData() {
    this.user = this.authService.currentUser ;
    if (this.user) {
      this.updateForm.patchValue({
        first_name: this.user.first_name,
        last_name: this.user.last_name,
        email: this.user.email,
      });
    }
  }

  get isInstructor() {
    return this.user?.role === 'Instructor';
  }
  get isStudent() {
    return this.user?.role === 'Student';
  }

  SaveProfile() {
    if (this.isStudent) {
      this.authService.updateProfileStudent(this.updateForm.value).subscribe({
        next: (response) => {
          this.user = response.data;
        },
        complete: () => {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authService['userSubject'].next(this.user);
          this.tostar.success('Profile updated successfully');
        },
      });
    } else if (this.isInstructor) {
      this.authService.updateProfileInstructor(this.updateForm.value).subscribe({
        next: (response) => {
          this.user = response.data;
        },
        complete: () => {
          localStorage.setItem('user', JSON.stringify(this.user));
          this.authService['userSubject'].next(this.user);
          this.tostar.success('Profile updated successfully');
        },
      });
    }
  }

  ChangePassword() {
    this.authService.changePassword(this.changeForm.value).subscribe({
      next: () => {
        this.authService.LogOut()
        this.router.navigate(['/LogIn']);
      },
    });
  }
}
