import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dashboard-layout/dash-board.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  {
    path: '', component: DashBoardComponent, children: [
      { path: '', redirectTo: 'home', pathMatch: 'full' },
      { path: 'home', component: HomeComponent },
      {  path: 'instructor',loadComponent: () => import('./instructor/instructor.module').then(m => m.InstructorModule)}

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes), SharedModule],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
