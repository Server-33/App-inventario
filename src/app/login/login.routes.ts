import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./view/login.component'),
      },
    ],
  },
] as Routes;
