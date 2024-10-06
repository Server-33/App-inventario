import { Routes } from '@angular/router';

export default [
  {
    path: '',
    children: [
      {
        path: 'medic',
        loadChildren: () =>
          import('./inventario/inventario.routes'),
      },
      {
        path: 'addProduct',
        loadChildren: () => import('./inventario/components/agregar-producto/addProducto.routes'),
      },
      {
        path: 'edit/:productoId',
        loadComponent: () => import('./inventario/components/agregar-producto/agregar-producto.component'),
      },
    ],
  },
] as Routes;
