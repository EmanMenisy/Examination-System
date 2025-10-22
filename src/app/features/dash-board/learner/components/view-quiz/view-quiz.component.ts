import { Component } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEditQuizComponent } from '../../../instructor/quiz/components/add-edit-quiz/add-edit-quiz.component';
import { QuizService } from '../../../instructor/quiz/services/quiz.service';
import { InstructorService } from '../../../instructor/services/instructor.service';
import { QuizCodeComponent } from '../quiz-code/quiz-code.component';
import { SharedModule } from '../../../../../shared/shared.module';
import { StudentQuizService } from '../../service/student-quiz.service';
import { join } from 'path';
import { JoinQuizComponent } from '../join-quiz/join-quiz.component';

@Component({
  selector: 'app-view-quiz',
  imports: [SharedModule],
  templateUrl: './view-quiz.component.html',
  styleUrl: './view-quiz.component.scss'
})
export class ViewQuizComponent {
currentLang = 'en';
  products: any[] = [];
  ref: any;
  quizzesList:any
  firstFiveQuizes:any
  constructor(
    private dialogService: DialogService,
    private _StudentQuizService: StudentQuizService,
    private _InstructorService:InstructorService,
    private _TranslateService:TranslateService
  ){}

  ngOnInit(): void {
     this.currentLang = this._TranslateService.currentLang ?? this._TranslateService.getDefaultLang() ?? 'en';
    this._TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      this.currentLang = event.lang;
    });
    this.getFirstData()
  }

  joinQuiz(){
    this.ref = this.dialogService.open(QuizCodeComponent, {
      width: '30rem',
      height: 'auto',
      contentStyle: { overflow: 'unset' },
      baseZIndex: 10000,
      breakpoints: "{ '1199px': '75vw', '575px': '90vw'}",
      modal: true,
      dismissableMask: true,
      styleClass: 'custom-dialog',

    });

    this.ref.onClose.subscribe((quidId: any) => {
      if (quidId) {
        this.openJoineDialog(quidId);
      }
    });
  }

  openJoineDialog(data: any) {
    this.dialogService.open(JoinQuizComponent, {
      width: '400px',
      data: data,
      styleClass: 'custom-dialog',
      modal: true,
      dismissableMask: true ,
    });
  }


getFirstData(){
  this._StudentQuizService.firstFiveIncoming().subscribe({
    next: (quizzes) => {
      this.firstFiveQuizes = quizzes;
    },
  });
}
}
