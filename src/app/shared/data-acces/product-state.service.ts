
import {inject, Injectable, Signal} from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { productService } from '../../products/data-acces/product.service';
import { map, Subject } from 'rxjs';


// clase modelo
interface State{
  products :Product[];
  status:'loading'|'succes'| 'error';
  page:number
}


@Injectable()
export class ProductService{

  // inyectando el servicio
  public productService = inject(productService)


  // creando una interface
  public initialState: State = {
    products: [],  //vacio
    status: 'loading' as const,  //estado como loading q sea const
    page:1
  };


  // Un Subject es una clase de RxJS que actúa como un observable (puedes suscribirte a él) y también como un observer (puedes emitir valores a través de él).
  // Propósito: Este Subject servirá para emitir eventos que indiquen un cambio en la página seleccionada, probablemente en una lista paginada.
  changePage$ = new Subject<number>();




  // cualquier cambio en el getProduct()
  // cualquie cambio lo actualiza
  state = signalSlice({
    initialState:this.initialState,  //se pasa el estado
    // sources : colección de flujos de datos observablesutilizará para actualizar el estado de manera reactiva. Es parte del patrón reactivo que permite que los cambios en los datos sean automáticamente reflejados en el estado y, por ende, en la interfaz de usuario.
    sources:[
      this.changePage$.pipe(
        map((page) =>({page, status:'loading' as const}))
      ),

      // metodo obtiene todo product
      // Esto permite que cualquier cambio en los productos o el estado se refleje automáticamente en la interfaz.
      this.productService
      // (1):parametro para el limit
      .getProduct(1)
      // products : toda la data
      .pipe(map((products) =>({products , status:'succes' as const})))
    ]
  });




}
