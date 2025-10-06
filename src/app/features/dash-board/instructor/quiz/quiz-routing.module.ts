import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { QuizOverviewComponent } from './components/quiz-overview/quiz-overview.component';
import { ListQuizComponent } from './components/list-quiz/list-quiz.component';
import { AddEditQuizComponent } from './components/add-edit-quiz/add-edit-quiz.component';

const routes: Routes = [
  {path:'', redirectTo: 'overview' , pathMatch:'full'},
  {path:'overview', component: QuizOverviewComponent},
  {path:'quizlist', component: ListQuizComponent},
  {path:'edit/id', component: AddEditQuizComponent},
  {path:'overview', component: QuizOverviewComponent},
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class QuizRoutingModule { }
