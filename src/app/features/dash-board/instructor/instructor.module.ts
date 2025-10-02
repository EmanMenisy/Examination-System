import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ListGroupComponent } from './components/groups/list-group/list-group.component';
import { InstructorComponent } from './instructor.component';
import { ListStudentsComponent } from '../students/components/list-students/list-students.component';
import { SharedModule } from '../../../shared/shared.module';
export const routes: Routes = [
   {path: '' , component: InstructorComponent, children:[
   {path : 'listGroup' ,  component : ListGroupComponent },
   {path : 'listStudent' ,  component : ListStudentsComponent },
   ]  
  }
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
