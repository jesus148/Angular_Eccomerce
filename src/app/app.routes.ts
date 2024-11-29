import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    // ruta perezosa
    path:'products', //ruta
    // carga al hijo
    loadChildren:()=>
      import('./products/features/product-shell/product.router')
  },
  {
    path:'**', //cualquier url
    redirectTo:'products' //redirige arriba
  }
];
