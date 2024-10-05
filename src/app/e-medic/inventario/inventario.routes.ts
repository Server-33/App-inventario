import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component'),
      },
    ],
  },
] as Routes;
