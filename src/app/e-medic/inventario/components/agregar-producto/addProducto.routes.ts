import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: '',
        loadComponent: () => import('./agregar-producto.component'),
      },
      {
        path: "edit/:productoId",
        loadComponent: () =>
          import("./agregar-producto.component"),
      },
    ],
  },
] as Routes;
