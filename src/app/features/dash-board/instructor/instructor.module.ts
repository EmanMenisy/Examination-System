import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListGroupComponent } from './components/groups/list-group/list-group.component';
import { InstructorComponent } from './instructor.component';
import { SharedModule } from '../../../shared/shared.module';
import { ListQuestionsComponent } from './components/questions/list-questions/list-questions.component';
import { ListStudentsComponent } from './students/components/list-students/list-students.component';
import { ListResultComponent } from './components/results/list-result/list-result.component';
import { ViewResultComponent } from './components/results/view-result/view-result.component';
export const routes: Routes = [
  {
    path: '',
    component: InstructorComponent,

    children: [
      { path: 'listGroup', component: ListGroupComponent },
      { path: 'listStudent', component: ListStudentsComponent },
      {
        path: 'quiz',
        loadChildren: () =>
          import('./quiz/quiz.module').then((m) => m.QuizModule),
      },
      { path: 'listQuestions', component: ListQuestionsComponent },
      { path: 'listResultsInstructor', component: ListResultComponent },
      { path: 'viewResultsInstructor', component: ViewResultComponent },
    ],
  },
];

@NgModule({
  declarations: [],
  imports: [CommonModule, RouterModule.forChild(routes), SharedModule],
})
export class InstructorModule {}
