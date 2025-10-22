import { Component, OnInit } from '@angular/core';
import { QuizService } from '../../services/quiz.service';
import { IExamRes, IQuiz } from '../../interfaces/iquiz';
import { DialogService } from 'primeng/dynamicdialog';
import { AddEditQuizComponent } from '../add-edit-quiz/add-edit-quiz.component';

@Component({
  selector: 'app-list-quiz',
  templateUrl: './list-quiz.component.html',
  styleUrl: './list-quiz.component.scss',
  standalone: false
})
export class ListQuizComponent implements OnInit {
QuizList:IExamRes[] = []
constructor(private _QuizService:QuizService ,private dialogService: DialogService ) {
}
  ngOnInit(): void {
    this.getALLQuizes()
  }

getALLQuizes(){
  this._QuizService.getAllQuizes().subscribe({
    next:(res)=>{
     this.QuizList = res
    }
  })
}

openEditDialouge(data: any) {
    this.dialogService.open(AddEditQuizComponent, {
      width: '45rem',
      data: data,
      styleClass:'custom-dialog',
      height: 'auto',
      contentStyle: { overflow: 'unset' },
      baseZIndex: 10000,
      breakpoints: "{ '1199px': '75vw', '575px': '90vw'}",
      modal: true,
      dismissableMask: true ,
    })
  }
}
