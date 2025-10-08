import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dashboard-layout/dash-board.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './components/dashboard-layout/home/home.component';
import { AddEditQuestionsComponent } from './instructor/components/questions/add-edit-questions/add-edit-questions.component';
import { ListQuestionsComponent } from './instructor/components/questions/list-questions/list-questions.component';
import { instructorGuard } from '../../core/Guards/instructor.guard';
import { studentGuard } from '../../core/Guards/student.guard';

const routes: Routes = [
  {
    path: '', component: DashBoardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {  path: 'instructor', canActivate: [instructorGuard] ,loadChildren: () => import('./instructor/instructor.module').then(m => m.InstructorModule)},
      {  path: 'learner',canActivate: [studentGuard] ,  loadChildren: () => import('./learner/learner.module').then(m => m.LearnerModule)},
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
