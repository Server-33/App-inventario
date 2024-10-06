import { Routes } from "@angular/router";

export default [
  {
    path: "",
    children: [
      {
        path: "",
        loadComponent: () => import("./dashboard/dashboard.component"),
      },
      {
        path: "edit",
        loadComponent: () => import("./components/agregar-producto/agregar-producto.component"),
      },

    ],
  },
] as Routes;
