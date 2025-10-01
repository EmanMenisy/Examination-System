import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {
  private readonly _TranslateService = inject(TranslateService);
  private readonly _PLATFORM_ID = inject(PLATFORM_ID);
  constructor() {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      const SavedLanguage = localStorage.getItem('lang') || 'en';
      this._TranslateService.setFallbackLang('en');
      this._TranslateService.use(SavedLanguage!);
      this.changeDirection();
    }
   }

   changeDirection() {
    const SavedLanguage = localStorage.getItem('lang');
    if (SavedLanguage === 'ar') {
      document.documentElement.dir = 'rtl';
    } else {
      document.documentElement.dir = 'ltr';
    }
  }

  changeLanguage(lang: string = 'en'): void {
    if (isPlatformBrowser(this._PLATFORM_ID)) {
      localStorage.setItem('lang', lang);
      this._TranslateService.use(lang);
      this.changeDirection();
    }
  }
}
