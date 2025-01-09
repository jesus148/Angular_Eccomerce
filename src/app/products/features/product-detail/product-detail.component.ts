import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailStateService } from '../../../shared/data-acces/product-detail-state.service';
import { productService } from '../../data-acces/product.service';
import { CurrencyPipe } from '@angular/common';



// selector
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './product-detail.component.html',
  styles: ``,
  // servicios rest
  providers:[ProductDetailStateService]
})

// clase
export default class ProductDetailComponent {






  // USANDO EL withComponentInputBinding(no me funciona)
  // inyectando el servicio
//   productDetailState = inject(ProductDetailStateService).state;


// // valor de entrada de los inputs en la url
//     // withComponentInputBinding() : para recibir parametros mediante la url al componente poner esto en el app.config.ts
//     // recordar que lo q viaja en la url son strings
//   id =input.required<string>();

//   // inicia
//   constructor(public service: productService){


//     // cuando inicia lanza esto. Registra un "efecto" que se programará y ejecutará cada vez que cambien las señales que lee.
//     // osea este effect mapea los cambios del id

//       effect(() => {
//         this.productDetailState.getById(this.id());
//       });

// }








// USANDO EL ACTIVE ROUTER
  // el activate route
  // ActivatedRoute
  // Proporciona acceso a información sobre una ruta asociada a un componente que se carga en una salida. Se utiliza para recorrer el RouterStateárbol y extraer información de los nodos.
  private activateRoute= inject(ActivatedRoute);
  // el servicio
productDetailState = inject(ProductDetailStateService).state;

// id = input.required<string>();

// inicia
constructor() {
  // cuando entra a este componente
  this.activateRoute.params.subscribe((params) => {
    // parametro de la url = en en tu router
    const id = params['id'];
    // printer
    // console.log('ID recibido desde ActivatedRoute:', id);
    // si existe
    if (id) {
      // ejecuta
      this.productDetailState.getById(id);
    }
  });
}













  }






