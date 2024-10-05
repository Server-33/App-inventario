import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: 'medic',
        loadChildren: () =>
          import('./inventario/inventario.routes'),
      }
    ],
  },
] as Routes;
