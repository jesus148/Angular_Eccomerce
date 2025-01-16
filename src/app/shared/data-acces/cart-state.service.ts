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



// SERVICIO PARA EL CARRITO DE COMPRAS


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
    // osea se ejecuta primero
    sources:[this.loadProducts$],
    // trigerear en base a acciones un cambio en el estado
    // esto se ejecuta en base a un evento como el add
    actionSources:{
      // el actionSources recibe el estado y en base a una accion o evento(AddChecklist) devulve un nuevo estado
      // debemos agregar el nuevo producto q le pasaremos a la lista
      // state : donde esta la data del sources
      // action$: Observable<ProductItemCart> : es el product del product-list.componente
      add: (state, action$: Observable<ProductItemCart>) =>
        // Transforma el observable action$ para actualizar el estado usando el método this.add.
        action$.pipe(
          // map : devuelve un metodo
          map((product)=> this.add(state, product)),
        ),
    },
    // este effecto mapea el state osea este signal
    effects: (state)=>({
      // carga
      load:()=>{
        // muestra
        console.log(state.products())

        // state().loaded : si existe esta cargado
        if(state().loaded){
          // guarda en el localstorage
          this._storageService.saveProducts(state().products);
        }
      }
    }),
  })




  // Este método agrega un producto al carrito, pero primero verifica si ya existe.
  private add(state: Signal<State>, product: ProductItemCart){

    // verificando q no se repita
    // state().products.find : de todo el product obtenido arriba en el sources:[this.loadProducts$],
    // devuelve el primer elemento encontado
    const isInCart = state().products.find(
      (productInCart) => productInCart.product.id === product.product.id,
    );

    // si no existe
    if(!isInCart){
      // ...state().products : es el estado del [this.loadProducts$]
      // y le agregas el ...product osea el nuevo del product:ProductItemCart + el quantity:1
      return {
        products: [...state().products, { ...product, quantity: 1 }],
      };
    }

    // en caso ya exista el producto
    isInCart.quantity += 1;
    return {
      // retrona el mismo products del sources:[this.loadProducts$]
      products: [...state().products],
    };
  }










}
