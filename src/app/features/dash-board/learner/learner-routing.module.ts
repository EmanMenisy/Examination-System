import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LearnerComponent } from './learner.component';
import { ViewQuizComponent } from './components/view-quiz/view-quiz.component';
import { QuizPageComponent } from './components/quiz-page/quiz-page.component';
import { ViewResultComponent } from './components/results/view-result-learner/view-result-learner.component';
import { ListResultComponent } from './components/results/list-result-learner/list-result-learner.component';

const routes: Routes = [
    {
      path: '',
      component: LearnerComponent,
      children: [
        { path: 'viewQuiz', component: ViewQuizComponent },
        { path: 'quiz', component: QuizPageComponent },
        { path: 'listResults', component: ListResultComponent },
        { path: 'viewResults', component: ViewResultComponent },
      ],
    },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LearnerRoutingModule {



}
