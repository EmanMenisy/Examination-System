import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { TranslationService } from '../../../../core/services/translation.service';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrls: ['./auth-layout.component.scss'],
  standalone: false
})
export class AuthLayoutComponent {
  currentLang = 'en';

  constructor(
    private _TranslationService: TranslationService,
    @Inject(PLATFORM_ID) private platformId: Object
  ) {
    if (isPlatformBrowser(this.platformId)) {
      this.currentLang = localStorage.getItem('lang') || 'en';
    }
  }

  toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this._TranslationService.changeLanguage(this.currentLang);
  }
}
