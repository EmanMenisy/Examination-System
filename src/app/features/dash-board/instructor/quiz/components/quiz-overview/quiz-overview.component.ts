import { Component } from '@angular/core';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEditQuizComponent } from '../add-edit-quiz/add-edit-quiz.component';
import { QuizCodeComponent } from '../quiz-code/quiz-code.component';

@Component({
  selector: 'app-quiz-overview',
  templateUrl: './quiz-overview.component.html',
  styleUrl: './quiz-overview.component.scss',
  standalone: false
})
export class QuizOverviewComponent {
currentLang = 'en'
products: any[] = [];
ref:any
constructor( private dialogService: DialogService) {  
}
  show() {
    this.ref = this.dialogService.open(AddEditQuizComponent, {
      width: '45rem',
      height: 'auto',
      contentStyle: { overflow: 'unset' },
      baseZIndex: 10000,
      breakpoints: "{ '1199px': '75vw', '575px': '90vw'}",
      modal: true,  
      dismissableMask: true ,
    });
      this.ref.onClose.subscribe((ExamCode:any) => {
      if (ExamCode) {
       this.openSecondDialog(ExamCode)
      }
    });
  }

    openSecondDialog(data: any) {
    this.dialogService.open(QuizCodeComponent, {
      width: '400px',
      data: data,
      styleClass: 'custom-dialog'
    });
    console.log(data)
  }
}
