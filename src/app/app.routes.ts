import { Routes } from '@angular/router';

export const routes: Routes = [

 {path:'' , loadChildren:()=> import ('./auth/auth.module').then((m) => m.AuthModule) },
{
path: 'dashboard',
    loadChildren: () =>
      import('./core/dash-board/dash-board.module').then(m => m.DashBoardModule)
  }
];
