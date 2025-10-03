import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListStudentsComponent } from './components/list-students/list-students.component';

const routes: Routes = [  //localhost/dashboard/students
  { path: '', redirectTo: 'show', pathMatch: 'full' },
  { path: 'show', component: ListStudentsComponent ,title:'Enrollers List' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
