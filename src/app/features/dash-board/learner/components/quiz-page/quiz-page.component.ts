import { Component, OnInit } from '@angular/core';
import { SharedModule } from '../../../../../shared/shared.module';
import { StudentQuizService } from '../../service/student-quiz.service';
import { ToastrService } from 'ngx-toastr';
import { ActivatedRoute, Router } from '@angular/router';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-quiz-page',
  imports: [SharedModule],
  templateUrl: './quiz-page.component.html',
  styleUrl: './quiz-page.component.scss',
})
export class QuizPageComponent implements OnInit {
  questions: any;
  quizData: any;
  selectedAnswers: string[] = [];
  activeStep = 1;
  questionwithAnswer: any[] = [];
  quizId: any;
  private sub!: Subscription;
  isSubmitted = false;
  constructor(
    private StudentQuizService: StudentQuizService,
    private _ToastrService: ToastrService,
    private _Router: Router,
    private route: ActivatedRoute
  ) {

      this.quizId = this.route.snapshot.paramMap.get('id')!;
  }
  ngOnInit(): void {
    this.getQuizQuestions();
    this.sub = this.StudentQuizService.examSubmit.subscribe(() => {
      this.submitQuiz();
    });
  }

  getQuizQuestions() {
    this.StudentQuizService.questionWithoutAnswers(
      this.quizId
    ).subscribe({
      next: (res) => {
        this.quizData = res.data;
        this.questions = res.data.questions;
        this.StudentQuizService.remainingTimeSubject.next(res.data.duration);
        this.StudentQuizService.setShowTimer(true);
      },
    });
  }

  nextStep() {
    this.activeStep++;
  }

  prevStep() {
    this.activeStep--;
  }

  onAnswerSelect(_id: any, answer: any) {
    console.log(answer);
    let questionindex = this.questionwithAnswer.findIndex(
      (x) => x.question == _id
    );
    if (questionindex == -1) {
      this.questionwithAnswer.push({
        question: _id,
        answer: answer,
      });
    } else {
      this.questionwithAnswer[questionindex].answer = answer;
    }
    console.log(this.questionwithAnswer);
  }
  submitQuiz() {
    this.StudentQuizService.setShowTimer(false);
    let payload = {
      answers: [...this.questionwithAnswer],
    };
    if (this.quizData) {
    this.StudentQuizService.submitQuiz(this.quizData._id, payload).subscribe({
      next: (res) => {
        this._ToastrService.success('exam submitted successfully');
        this._Router.navigate(['/dashboard/learner/viewQuiz']);
      }
    });
  }
  }

  ngOnDestroy(): void {
  this.StudentQuizService.setShowTimer(false);
  if (this.sub) this.sub.unsubscribe();
}
}
