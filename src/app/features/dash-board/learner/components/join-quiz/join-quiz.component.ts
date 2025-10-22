import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { StudentQuizService } from '../../service/student-quiz.service';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-join-quiz',
  imports: [SharedModule],
  templateUrl: './join-quiz.component.html',
  styleUrl: './join-quiz.component.scss'
})

export class JoinQuizComponent implements OnInit {
 quiz:any
 quizName= ""
  constructor(private ref: DynamicDialogRef , private config: DynamicDialogConfig
 , private _StudentQuizService:StudentQuizService ,
private _Router:Router) {
  }

  ngOnInit(): void {
   this.quiz = this.config.data
  }


 close() {
    this._Router.navigate(['/dashboard/learner/quiz/',this.quiz]);
    this.ref.close();
  }

}
