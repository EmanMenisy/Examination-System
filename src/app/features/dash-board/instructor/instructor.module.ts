import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListGroupComponent } from './components/groups/list-group/list-group.component';
import { InstructorComponent } from './instructor.component';
import { ListStudentsComponent } from '../students/components/list-students/list-students.component';
import { SharedModule } from '../../../shared/shared.module';
import { ListResultComponent } from './components/results/list-result/list-result.component';
import { ViewResultComponent } from './components/results/view-result/view-result.component';
import { ListQuestionsComponent } from './components/questions/list-questions/list-questions.component';
export const routes: Routes = [
   {path: '' , component: InstructorComponent, children:[
   {path : 'listGroup' ,  component : ListGroupComponent },
   {path : 'listStudent' ,  component : ListStudentsComponent },
   {path : 'listResults' ,  component : ListResultComponent },
   {path : 'viewResults' ,  component : ViewResultComponent },
   {path : 'listQuestions' ,  component : ListQuestionsComponent },
   {path:'quiz' ,loadChildren: () => import('./quiz/quiz.module').then(m => m.QuizModule)}
  ]}
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule
  ]
})
export class InstructorModule { }
