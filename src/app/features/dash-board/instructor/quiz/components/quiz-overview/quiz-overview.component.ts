import { InstructorModule } from './../../../instructor.module';
import { Component, OnInit } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEditQuizComponent } from '../add-edit-quiz/add-edit-quiz.component';
import { QuizCodeComponent } from '../quiz-code/quiz-code.component';
import { QuizService } from '../../services/quiz.service';
import { InstructorService } from '../../../services/instructor.service';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrl: './quiz-overview.component.scss',
  standalone: false,
})
export class QuizOverviewComponent implements OnInit {
  currentLang = 'en';
  products: any[] = [];
  ref: any;
  quizzesList:any
  firstFiveQuizes:any
  constructor(
    private dialogService: DialogService,
    private _QuizService: QuizService,
    private _InstructorService:InstructorService,
    private _TranslateService:TranslateService
  ){}

  ngOnInit(): void {
     this.currentLang = this._TranslateService.currentLang ?? this._TranslateService.getDefaultLang() ?? 'en';
    this._TranslateService.onLangChange.subscribe((event: LangChangeEvent) => {
      console.log('Language changed to:', event.lang);
      this.currentLang = event.lang;
    });
    // this.getAllQuizzesWithGroups();
    this.getFirstData()
  }

  show(){
    this.ref = this.dialogService.open(AddEditQuizComponent, {
      width: '45rem',
      height: 'auto',
      contentStyle: { overflow: 'unset' },
      baseZIndex: 10000,
      breakpoints: "{ '1199px': '75vw', '575px': '90vw'}",
      modal: true,
      dismissableMask: true,
    });
    this.ref.onClose.subscribe((ExamCode: any) => {
      if (ExamCode) {
        this.opeCodeDialog(ExamCode);
      }
    });
  }

  opeCodeDialog(data: any) {
    this.dialogService.open(QuizCodeComponent, {
      width: '400px',
      data: data,
      styleClass: 'custom-dialog',
    });
    console.log(data);
  }

//  getAllQuizzesWithGroups() {
//   this._QuizService.lastComplatedQuiz().subscribe({
//     next: (quizzes) => {
//       quizzes.forEach((quiz: any) => {
//         this._InstructorService.getGroupById(quiz.group).subscribe({
//           next: (group) => {
//             quiz.groupName = group.name;
//             quiz.studentsCount = group.students.length;
//           },
//         });
//       });
//       console.log("Quizzes with group info:", quizzes);
//       this.quizzesList = quizzes; 
//     },
//   });
// }

getFirstData(){
  // this._QuizService.firstFiveIncome().subscribe({
  //   next:(res)=>{
  //     this.firstFiveQuizes = res
  //   }
  // })
  this._QuizService.firstFiveIncome().subscribe({
    next: (quizzes) => {
      quizzes.forEach((quiz: any) => {
        this._InstructorService.getGroupById(quiz.group).subscribe({
          next: (group) => {
            quiz.groupName = group.name;
            quiz.studentsCount = group.students.length;
          },
        });
      });
      console.log("Quizzes with group info:", quizzes);
      this.firstFiveQuizes = quizzes; 
    },
  });
}
}
