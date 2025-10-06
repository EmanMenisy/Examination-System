import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuizRoutingModule } from './quiz-routing.module';
import { AddEditQuizComponent } from './components/add-edit-quiz/add-edit-quiz.component';
import { ListQuizComponent } from './components/list-quiz/list-quiz.component';
import { QuizOverviewComponent } from './components/quiz-overview/quiz-overview.component';
import { SharedModule } from '../../../../shared/shared.module';


@NgModule({
  declarations: [
    AddEditQuizComponent,
    ListQuizComponent,
    QuizOverviewComponent,
  ],
  imports: [
    CommonModule,
    QuizRoutingModule,
    SharedModule
  ]
})
export class QuizModule { }
