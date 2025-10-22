import { IStudent } from '../../../../../shared/Interfaces/home';
import { Component, inject, OnInit, PLATFORM_ID } from '@angular/core';
import { HomeService } from '../../../../../core/services/home.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent implements OnInit {
  currentLang = 'en'
   studentList:IStudent[] = []
   role:any
  constructor(private _HomeService:HomeService ,  private _TranslateService:TranslateService
) {
  }

  ngOnInit(): void {
    this.currentLang = this._TranslateService.currentLang ?? this._TranslateService.getDefaultLang() ?? 'en';
    this._TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });

   this.role = localStorage.getItem('Role')
    if (this.role === 'Instructor') {
     this.getTopStudents()
    }
}

  getTopStudents(){
    this._HomeService.getTopStudents().subscribe({
      next:(res)=>{
        this.studentList = res
      },
    })
  }

}
