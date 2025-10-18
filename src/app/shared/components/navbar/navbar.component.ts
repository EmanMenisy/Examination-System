import { Component, SimpleChanges, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { TranslationService } from '../../../core/services/translation.service';
import { AuthService } from '../../../features/auth/Services/auth.service';
import { StudentQuizService } from '../../../features/dash-board/learner/service/student-quiz.service';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
  standalone: false
})
export class NavbarComponent {
  navName: string = 'Guest';
  userRole: string = 'unknown';
  currentLang: string = 'en';
  user: any = null;
  timing: any;
  showTimer: boolean = false;

  menuItems: MenuItem[] = [
    { label: 'Profile settings', icon: 'pi pi-user', command: () => this.router.navigate(['/dashboard/profile']) },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  constructor(
    private router: Router,
    private auth: AuthService,
    private StudentQuizService: StudentQuizService,
    private translation: TranslationService
  ) {
    const lang = localStorage.getItem('lang');
    this.currentLang = lang || 'en';
  }

  ngOnInit() {
    this.get()
    this.StudentQuizService.remainingTime.subscribe({
      next: (time) => {
        this.timing = time;
      }
    });

    this.StudentQuizService.showTimer.subscribe({
      next: (show) => {
        this.showTimer = show;
        console.log('showTimer in navbar:', this.showTimer);
      }
    });
  }

  get() {
    this.auth.getUserData.subscribe(user => {
      this.user = user;
      if (this.user) {
        this.navName = `${this.user.first_name} ${this.user.last_name}`;
        this.userRole = this.user.role;
      } else {
        this.navName = 'Guest';
        this.userRole = 'unknown';
      }
    });
  }

  createNewQuiz() {
    this.router.navigate(['/quizzes/new']);
  }

  logout() {
    this.auth.LogOut();
    this.router.navigate(['/LogIn']).then(() => {
      window.location.reload();
    });
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translation.changeLanguage(this.currentLang);
  }
}

