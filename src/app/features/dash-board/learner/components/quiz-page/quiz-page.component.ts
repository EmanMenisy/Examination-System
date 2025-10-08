import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { StudentQuizService } from '../../service/student-quiz.service';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-quiz-page',
  imports: [SharedModule],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss'
})
export class QuizPageComponent implements OnInit{
questions:any
quizData:any
selectedAnswers: string[] = []
activeStep = 1;
questionwithAnswer:any[] = []
constructor(private StudentQuizService:StudentQuizService  , private _ToastrService:ToastrService , private _Router:Router) {}
  ngOnInit(): void {
   this.getQuizQuestions()
  }

  getQuizQuestions(){
    this.StudentQuizService.questionWithoutAnswers('68e587845358146037d6a265').subscribe({
      next:(res)=>{console.log(res)
        this.quizData = res.data
        this.questions = res.data.questions
        console.log(this.questions )
      }
    })
  }

  nextStep() {
    this.activeStep++;
  }

  prevStep() {
    this.activeStep--;
  }

  onAnswerSelect(_id:any, answer:any){
   console.log(answer)
   let questionindex = this.questionwithAnswer.findIndex(x => x.question == _id)
      if(questionindex == -1){
        this.questionwithAnswer.push({
            "question":_id,
            "answer": answer
        }
      )
      }
      else{
            this.questionwithAnswer[questionindex].answer = answer
      } 
    console.log(this.questionwithAnswer)  
  }
  submitQuiz() {
    let payload = {
      answers:[
        ...this.questionwithAnswer
      ]
    }
    this.StudentQuizService.submitQuiz(this.quizData._id , payload).subscribe({
      next:(res)=>{
        this._ToastrService.success('exam submitted successfully')
        this._Router.navigate(['/dashboard/learner/viewQuiz'])
      }
    })
  }

}
