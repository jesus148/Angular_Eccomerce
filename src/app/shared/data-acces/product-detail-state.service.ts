
import {inject, Injectable, Signal} from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { productService } from '../../products/data-acces/product.service';
import { catchError, map, Observable, of, startWith, Subject, switchMap } from 'rxjs';
import { SIGNAL } from '@angular/core/primitives/signals';


// clase modelo
interface State{
  products : Product | null;
  status:'loading'|'succes'| 'error';
}


@Injectable()
export class ProductDetailStateService{

  // inyectando el servicio
  public productService = inject(productService)


  // creando una interface
  public initialState: State = {
    products: null,  //vacio
    status: 'loading' as const,  //estado como loading q sea cons
  };






  // ESTE SIGNAL MAPEA LOS CAMBIOS
  // cualquier cambio en el getProduct()
  // cualquie cambio lo actualiza
  // el regresado state El objeto será un estándar. solo lectura señal, pero también tendrá propiedades adjuntas que se analizarán a continuación.
  // signalSlice solo actualizara un parte es lo contrario a un signal , osea el signalSlice es mas pequeño
  state = signalSlice({
    // initialState : estado inicial en caso no haiga ningun estado o valor
    initialState:this.initialState,  //se pasa el estado
    // sources : colección de flujos de datos observablesutilizará para actualizar el estado de manera reactiva. Es parte del patrón reactivo que permite que los cambios en los datos sean automáticamente reflejados en el estado y, por ende, en la interfaz de usuario.
    // sources : Permite combinar múltiples Signals como fuente y crea un Signal derivado reactivo que depende de todos ellos. basicamente es para poner partes o valores de los signalslice
    // sources:[
    // ],
    // acciones para llenar el estado , cambiar nuestros estado o llamar a otros servicios
    actionSources:{
      getById:(_state, $: Observable<string>)=>
      //  el .pipe para manejar los observablers
        $.pipe(
          // switchMap : para cancelar un renderizado o ejecucion. En términos sencillos, cuando llega un nuevo valor, switchMap cancela el flujo de datos anterior
        switchMap((id)=>this.productService.getProductOnly(id)),
        // .map es el que muestra la data
        map(data => ({product:data, status:'succes' as const}))
      )
    }
  });




}





