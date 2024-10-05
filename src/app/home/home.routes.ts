import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: 'usuarios',
        loadChildren: () =>
          import('../contacts/features/contact-shell/contact-shell.routes'),
      },
      {
        path: 'socios',
        loadChildren: () => import('../socios/socios.routes'),
      },
      {
        path: 'login',
        loadChildren: () => import('../login/login.routes'),
      },
    ],
  },
] as Routes;
