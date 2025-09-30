import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './components/home/home.component';

const routes: Routes = [
  { path: '', component: DashBoardComponent ,children:[
    {path:'home',component:HomeComponent}
  ]}
];

@NgModule({
  imports: [RouterModule.forChild(routes),SharedModule],
  exports: [RouterModule]
})
export class DashBoardRoutingModule { }
