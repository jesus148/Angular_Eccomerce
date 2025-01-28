import { inject, Injectable, Signal } from '@angular/core';
import { ProductItemCart } from '../interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from './storage.service';
import { count, map, Observable } from 'rxjs';


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
  // Esto se ejecuta si o si en el signalSlice , en el sources:[this.loadProducts$],
  // products : data del metodo loadproduct y lo guarda en products
  // loaded:true : es el atributo
  loadProducts$ = this._storageService
    .loadProducts()
    .pipe(map((products) =>({products, loaded:true})))



  // ESTO INICIA Y MAPEA LOS CAMBIOS
  // ojo : al inyectar un servicio este se ejecuta auto , pero en este caso se ejecuta hasta el sources:[this.loadProducts$],
  // solo la primera vez
  state = signalSlice({
    // con este estado inicia
    initialState:this.initialState,
    // INCIIA ESTO
    // con esto llena el estado o es basicamente lo q muestra
    // osea se ejecuta primero si o si , si inyectas este servicio en un componente esto se mostrara en ese componente
    // this.loadProducts$ : metodo de arriba
    sources:[this.loadProducts$],


    // SELECTORES MODIFICAN LAS PROPIEDADES DEL initialState, pero no lo modifica directamente sus propiedades
    // selectors : De manera predeterminada, todas las propiedades de nivel superior del estado inicial se expondrán como selectores, que son señales calculadas en el objeto de estado.osea el selectors es para calcular las propiedades del initialState. osea el selector es una función que se utiliza para extraer datos específicos del estado global del store
    // el (state) es el
    selectors:(state)=>({

      // determinar la cantidad de todos los productos
      count: () =>
        // state().products. : es la data del  sources:[this.loadProducts$],
      // recordar que products : tiene dentro los atributos product y quantity
      // acc , product : donde acc es el acumulador de todas las sumas y product es el index especifico del producto
      // , 0 : es la acumulador empieza en cero ,  acc + product.quantity  se suma y se agrega al acc auto
      // al final me retorna esto en el count() arriba
      state().products.reduce((acc , product) => acc + product.quantity , 0),




      // determina el precio de todos los productos del carrito
      price : ()=>{
        // state().products.reduce : es la data del  sources:[this.loadProducts$]
        return state().products.reduce(
          // acc : el acumulador
          // product  : es el index
          // al final me retorna en el price: arriba
          (acc, product) => acc + product.product.price  * product.quantity,0,
        )
      }

    }),


    // ACCIONES PROVOCADAS POR EL USUARIO Q MODIFICAN EL STATE
    // trigerear en base a acciones un cambio en el estado
    // esto se ejecuta en base a un evento como el add , remove o el update
    actionSources:{

      // ACTION PARA AGREGAR
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



        // ACCION PARA ELIMINAR
        // state : donde esta la data del sources:[this.loadProducts$],
        // action$:Observable<number> recibe un id number
      remove:(state , action$:Observable<number>)=> action$.pipe(
        // el .map devulve
        // remove : llama al metodo de mas abajo
        map((id) => this.remove(state, id))
      ),



      // ACCION ACTUALIZAR
      udpate: (state, action$: Observable<ProductItemCart>) =>
        action$.pipe(map((product) => this.update(state, product))),


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
          // guarda en el localstorage solo el products
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
  // solo en memoria
  // state:Signal<State> : la data actual del  sources:[this.loadProducts$],
  // id:number : id del producto
  private remove(state:Signal<State>, id:number){
    // retorna
    // recordar sola de la interface State solo se modifica el products

    return{
      // state().products.filter : del estado sus products
      // .filter: solo pasa los que son id sean diferentes al id:number
      products : state().products.filter((product)=>product.product.id !== id),
    }
  }





  // METODO ACTUALIZAR
  // state: Signal<State> : data del ...state().products : es el estado del [this.loadProducts$] este parametro se envia auto
  // product: ProductItemCart : data pasado como parametro
  private update(state: Signal<State>, product: ProductItemCart) {

    // state().products.map hace un recorrido
    // const products : la variable donde se agrega
    const products = state().products.map((productInCart) => {

      // verificando si el id es igual al del estado y el product pasado como parametro
      if (productInCart.product.id === product.product.id) {
        // se queda ahi
        // Si los id coinciden, crea una copia del producto existente ({ ...productInCart }) y actualiza su cantidad (quantity).
        return { ...productInCart, quantity: product.quantity };
      }


      // retorna el mismo product del carrito
      // Si el id no coincide, el producto en el carrito se devuelve sin modificaciones.
      // state: Signal<State> : osea la data
      return productInCart;
    });

    // retorna la variable
    return { products };
  }










}
