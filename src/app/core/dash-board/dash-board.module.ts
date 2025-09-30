import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashBoardRoutingModule } from './dash-board-routing.module';
import { DashBoardComponent } from './components/dash-board/dash-board.component';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [
    DashBoardComponent
  ],
  imports: [
    CommonModule,
    DashBoardRoutingModule,
    SharedModule
  ]
})
export class DashBoardModule { }
