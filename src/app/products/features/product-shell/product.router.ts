
import {Route, Routes} from '@angular/router';


export default[
  // ruta vacia carga el product-list component
  {
    path:'', loadComponent: ()=>import('../product-list/product-list.component')
  },
  {
   path:'product/:id',
   loadComponent:() => import('../product-detail/product-detail.component'),
  }
] as Routes;
