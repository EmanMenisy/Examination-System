import { Routes } from '@angular/router';
import { authGuard } from './auth/Guards/auth.guard';

export const routes: Routes = [

  { path: '', loadChildren: () => import('./auth/auth.module').then((m) => m.AuthModule) },
  {
    path: 'dashboard',
    canActivate: [authGuard],
    loadChildren: () =>
      import('./core/dash-board/dash-board.module').then((m) => m.DashBoardModule)
  },
];
