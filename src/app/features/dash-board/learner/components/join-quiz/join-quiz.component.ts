import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { StudentQuizService } from '../../service/student-quiz.service';

@Component({
  selector: 'app-join-quiz',
  imports: [SharedModule],
  templateUrl: './join-quiz.component.html',
  styleUrl: './join-quiz.component.scss'
})
export class JoinQuizComponent implements OnInit {
 quiz:any
 quizName= ""
  constructor(private ref: DynamicDialogRef ,  private config: DynamicDialogConfig , private _StudentQuizService:StudentQuizService ) {
    
  }
 
  ngOnInit(): void {
   this.quiz = this.config.data
  }


 close() {
    this.ref.close();
  }




}
