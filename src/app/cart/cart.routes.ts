import { Routes } from '@angular/router';

export default [
  {
    // http://localhost:4200/cart
    path: '',
    loadComponent: () => import('./cart.component'),
  },
] as Routes;
