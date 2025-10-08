import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnerComponent } from './learner.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';

const routes: Routes = [
    {
      path: '',
      component: LearnerComponent,
      children: [
        { path: 'viewQuiz', component: ViewQuizComponent },
        { path: 'quiz', component: QuizPageComponent },
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnerRoutingModule { 
 
  

}
