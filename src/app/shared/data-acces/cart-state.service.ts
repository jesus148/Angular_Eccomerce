import { inject, Injectable, Signal } from '@angular/core';
import { ProductItemCart } from '../interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from './storage.service';
import { map, Observable } from 'rxjs';


// creando clase modelo
interface State{
  products:ProductItemCart[];
  loaded:boolean
}

@Injectable({providedIn: 'root'})
export class CarteStateService {

  // inyectando servicio
  private _storageService = inject(StorageService);

  // Estado inicial de la señal
  // creando un objeto de tipo state
  private initialState:State= {
    products:[], //aca se almacena la data
    loaded:false
  }



  // NOS DEVUELVE LOS PROUDUCTOS ALMACENADOS EN LOCALSTORAGE Y SI HA SIDO CARGADO
  loadProducts$ = this._storageService
    .loadProducts()
    .pipe(map((products) =>({products, loaded:true})))



  // ESTO INICIA Y MAPEA LOS CAMBIOS
  state = signalSlice({
    // con este estado inicia
    initialState:this.initialState,
    // con esto llena el estado o es basicamente lo q muestra
    sources:[this.loadProducts$],
    // trigerear en base a acciones un cambio en el estado
    actionSources:{
      // el actionSources recibe el estado y en base a una accion o evento(AddChecklist) devulve un nuevo estado
      // debemos agregar el nuevo producto q le pasaremos a la lista
      // add: (state, action$: Observable<ProductItemCart>) =>
      //   action$.pipe(
      //     // map : devuelve un metodo
      //     map((product)=> this.add(state, product)),
      //   ),
    },
    // este effecto mapea el state osea este signal
    effects: (state)=>({
      // carga
      load:()=>{
        // muestra
        console.log(state.products())
      }
    }),
  })




  private add(state:Signal<State>, product:ProductItemCart){
    // const isInCart
  }



}
