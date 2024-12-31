import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductDetailStateService } from '../../../shared/data-acces/product-detail-state.service';



// selector
@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styles: ``,
  // servicios rest
  providers:[ProductDetailStateService]
})

// clase
export default class ProductDetailComponent {

  // el activate route
  // ActivatedRoute
  // Proporciona acceso a información sobre una ruta asociada a un componente que se carga en una salida. Se utiliza para recorrer el RouterStateárbol y extraer información de los nodos.
  // private activateRoute= inject(ActivatedRoute);


  // inyectando el servicio
productDetailSatte = inject(ProductDetailStateService).state;


// valor de entrada de los inputs en la url
    // withComponentInputBinding() : para recibir parametros mediante la url al componente poner esto en el app.config.ts
  id =input.required<string>();

  // inicia
  constructor(){

    // cuando inicia lanza esto. Registra un "efecto" que se programará y ejecutará cada vez que cambien las señales que lee.
    // osea este effect mapea los cambios del id
    effect(()=>{
      this.productDetailSatte.getById(this.id());
    })


    console.log(this.productDetailSatte.products());
    // con esto imprime el valor o parametro obtenido en la url
    // withComponentInputBinding() : para recibir parametros mediante la url al componente
    // effect(()=>{
    //   console.log(this.id());
    // })

    // de esta ruta seleccionada se obtiene los parametros q pasas por la url
    // this.activateRoute.params.subscribe((params)=>{
    //   console.log(params);
    // })

  }




}
