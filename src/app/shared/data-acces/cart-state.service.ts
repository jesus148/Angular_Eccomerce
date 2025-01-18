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
  // ojo : al inyectar un servicio este se ejecuta auto , pero en este caso se ejecuta hasta el sources:[this.loadProducts$],
  // solo la primera vez
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
      // este add: es el evento
      // debemos agregar el nuevo producto q le pasaremos a la lista
      // state : donde esta la data del sources, este dato es auto no es nesecario enviar
      // action$: Observable<ProductItemCart> : es el product del product-list.componente
      add: (state, action$: Observable<ProductItemCart>) =>
        // Transforma el observable action$ para actualizar el estado usando el método this.add.
      // el .pipe para manejar los observables
        action$.pipe(
          // map : devuelve un metodo
          // llama al metodo de abajo que es el this.add este metodo esta mas abajo
          // el product es es el action$: Observable<ProductItemCart>
          map((product)=> this.add(state, product)),
        ),

      remove:(state , action$:Observable<number>)=> action$.pipe(
        map((id) => this.remove(state, id))
      ),
    },
    // este effecto mapea el state osea este signal
    // tanto para los sources y los actionSources
    effects: (state)=>({
      // carga
      load:()=>{

        // muestra en la consola el product la data
        console.log(state.products())

        // state().loaded : si existe esta cargado
        if(state().loaded){
          // guarda en el localstorage
          this._storageService.saveProducts(state().products);
        }
      }
    }),
  })





  // METODO AGREGA CARRITO ES UN EVENTO DEL USUARIO
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
        // recordar sola de la interface State solo se modifica el products , pq el loaded ya esta cambiado
        products: [...state().products, { ...product, quantity: 1 }],
      };
    }

    // en caso ya exista el producto
    // recordar sola de la interface State solo se modifica el products que se queda en igual y solo se envia el quantity , pq el loaded ya esta cambiado
    isInCart.quantity += 1;
    return {
      // retrona el mismo products del sources:[this.loadProducts$]
      products: [...state().products],
    };
  }






  // METODO ELIMINA CARRITO ES UN EVENTO DEL USUARIO
  private remove(state:Signal<State>, id:number){
    return{
      products : state().products.filter((product)=>product.product.id !== id),
    }
  }





}
