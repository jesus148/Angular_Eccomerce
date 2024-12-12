
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
  private productService = inject(productService)


  // creando una interface
  private initialState: State = {
    products: [],  //vacio
    status: 'loading' as const,  //estado como loading q sea const
  };



  // cualquier cambio en el getProduct()
  state = signalSlice({
    initialState:this.initialState,  //se pasa el estado
    sources:[
      // metodo obtiene todo product
      this.productService
      .getProduct()
      // products : toda la data
      .pipe(map((products) =>({products , status:'succes' as const})))
    ]
  });




}
