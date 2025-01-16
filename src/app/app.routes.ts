import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // ruta perezosa
    // http://localhost:4200/
    path:'', //ruta
    // carga al hijo
    loadChildren:()=>
      import('./products/features/product-shell/product.router')
  },
  {
    // http://localhost:4200/cart
    path:'cart',
    loadChildren:()=> import('./cart/cart.routes')},
  {
    path:'**', //cualquier url
    redirectTo:'' //redirige arriba
  }
];


