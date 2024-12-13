
import {inject, Injectable, Signal} from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { productService } from '../../products/data-acces/product.service';
import { map } from 'rxjs';


// clase modelo
interface State{
  products :Product[];
  status:'loading'|'succes'| 'error';
}


@Injectable()
export class ProductService{

  // inyectando el servicio
  public productService = inject(productService)


  // creando una interface
  public initialState: State = {
    products: [],  //vacio
    status: 'loading' as const,  //estado como loading q sea const
  };



  // cualquier cambio en el getProduct()
  // cualquie cambio lo actualiza
  state = signalSlice({
    initialState:this.initialState,  //se pasa el estado
    sources:[
      // metodo obtiene todo product
      // Esto permite que cualquier cambio en los productos o el estado se refleje automáticamente en la interfaz.
      this.productService
      .getProduct()
      // products : toda la data
      .pipe(map((products) =>({products , status:'succes' as const})))
    ]
  });




}
