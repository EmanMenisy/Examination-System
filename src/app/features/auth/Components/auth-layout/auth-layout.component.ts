import { Component } from '@angular/core';
import { TranslationService } from '../../../core/services/translation.service';

@Component({
  selector: 'app-auth-layout',
  templateUrl: './auth-layout.component.html',
  styleUrl: './auth-layout.component.scss',
  standalone : false
})
export class AuthLayoutComponent {
  currentLang = 'en';
  constructor(private _TranslationService:TranslationService ) {
    this.currentLang = localStorage.getItem('lang') || 'en';

  }

   toggleLanguage() {
    this.currentLang = this.currentLang === 'en' ? 'ar' : 'en';
    this._TranslationService.changeLanguage(this.currentLang);
  }


}
