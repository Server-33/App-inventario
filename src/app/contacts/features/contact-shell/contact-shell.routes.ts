import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () =>
          import('../contact-dashboard/contact-dashboard.component'),
      },
      {
        path: 'create',
        loadComponent: () =>
          import('../contact-create/contact-create.component'),
      },
      {
        path: 'edit/:contactId',
        loadComponent: () =>
          import('../contact-create/contact-create.component'),
      },
    ],
  },
] as Routes;
