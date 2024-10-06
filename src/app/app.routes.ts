import { Routes } from '@angular/router';
import { AuthGuard } from './e-medic/login.guard';

export const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./e-medic/medic.routes'),
    canActivate: [AuthGuard],
  },
  {
    path: 'login',
    loadComponent: () => import('./e-medic/login/login.component')
  },
  {
    path: '**',
    redirectTo: '/',
  },
];
