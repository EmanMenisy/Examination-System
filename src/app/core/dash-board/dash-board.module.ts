import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './components/dashboard-layout/dash-board.component';
import { SharedModule } from '../../shared/shared.module';
import { HomeComponent } from './components/home/home.component';

@NgModule({
  declarations: [
    DashBoardComponent,
    HomeComponent
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    SharedModule
  ]
})
export class DashBoardModule { }
