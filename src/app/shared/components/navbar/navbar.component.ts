import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { Router } from '@angular/router';
import { AuthService } from '../../../auth/Services/auth.service';
import { TranslationService } from '../../../core/services/translation.service';

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

  menuItems: MenuItem[] = [
    { label: 'Profile settings', icon: 'pi pi-user', command: () => this.router.navigate(['/profile']) },
    { label: 'Logout', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  constructor(
    private router: Router,
    private auth: AuthService,
    private translation: TranslationService
  ) {
    const first = localStorage.getItem('First');
    const last = localStorage.getItem('Last');
    const role = localStorage.getItem('Role');
    const lang = localStorage.getItem('lang');

    if (first && last) {
      this.navName = `${first} ${last}`;
    }

    if (role) {
      this.userRole = role;
    }

    this.currentLang = lang || 'en';
  }

  createNewQuiz() {
    this.router.navigate(['/quizzes/new']);
  }

  logout() {
    this.auth.LogOut();
    this.router.navigate(['/auth/LogIn']).then(() => {
      window.location.reload();
    });
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this.translation.changeLanguage(this.currentLang);
  }
}
