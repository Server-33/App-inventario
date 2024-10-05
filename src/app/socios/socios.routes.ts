import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./features/socios-dashboard/socios-dashboard.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('./features/socios-create/socios-create.component'),
      },
    ],
  },
] as Routes;
