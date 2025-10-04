import { IStudent } from './../../Interfaces/home';
import { Component, OnInit } from '@angular/core';
import { HomeService } from '../../../../core/services/home.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
  standalone: false
})
export class HomeComponent implements OnInit {
  currentLang = 'en'
studentList:IStudent[] = []
  constructor(private _HomeService:HomeService ,  private _TranslateService:TranslateService
) {
  }

  ngOnInit(): void {
    this.currentLang = this._TranslateService.currentLang ?? this._TranslateService.getDefaultLang() ?? 'en';
    this._TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('Language changed to:', event.lang);
      this.currentLang = event.lang;
    });
    this.getTopStudents()
  }

  getTopStudents(){
    this._HomeService.getTopStudents().subscribe({
      next:(res)=>{
        this.studentList = res
      },
      error:(err)=>{console.log(err)},
    })
  }

}
