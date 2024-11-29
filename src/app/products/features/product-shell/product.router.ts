
import {Route, Routes} from '@angular/router';


export default[
  // ruta vacia carga el product-list component
  {path:'', loadComponent: ()=>import('../product-list/product-list.component')}
] as Routes;
