import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { ListGroupComponent } from './components/list-group/list-group.component';
import { SharedModule } from '../../../shared/shared.module';

export const routes: Routes = [
   //  { path: '', redirectTo: 'list', pathMatch: 'full' },
     {  path: 'list',loadComponent: () => import('./components/list-group/list-group.component').then(c => c.ListGroupComponent)}



];


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class InstructorModule { }
