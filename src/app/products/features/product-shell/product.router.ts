
import {Routes} from '@angular/router';


export default[
  // ruta vacia carga el product-list component
  // http://localhost:51552/
  {
    // http://localhost:4200/
    path:'', loadComponent: ()=>import('../product-list/product-list.component')
  },
  {


    // http://localhost:4200/product/1
   path:'product/:id',
   loadComponent:() => import('../product-detail/product-detail.component'),
  }
] as Routes;
