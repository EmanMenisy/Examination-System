import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StudentQuizService } from '../../service/student-quiz.service';

@Component({
  selector: 'app-quiz-code',
  imports: [SharedModule],
  templateUrl: './quiz-code.component.html',
  styleUrl: './quiz-code.component.scss',
})
export class QuizCodeComponent implements OnInit {
  inputValue:string=''
  quizId:any
  constructor(
    private ref: DynamicDialogRef,
    private _StudentQuizService:StudentQuizService
  ) {}

  ngOnInit(): void {
   
  }

  JoinQuiz(){
    console.log(this.inputValue)
    this._StudentQuizService.joinQuiz(this.inputValue).subscribe({
      next:(res)=>{
         this.quizId = res.data.quiz
      },
      complete:()=>{
        this.ref.close(this.quizId);
      },
    })
  }

  close() {
    this.ref.close(this.quizId);
  }

}
