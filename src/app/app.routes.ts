import { Routes } from '@angular/router';
import { authGuard } from './core/Guards/auth.guard';
export const routes: Routes = [

  { path: '', loadChildren: () => import('./features/auth/auth.module').then((m) => m.AuthModule) },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./features/dash-board/dash-board.module').then((m) => m.DashBoardModule)
  },


];
