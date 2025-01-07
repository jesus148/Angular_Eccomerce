import { inject, Injectable } from '@angular/core';
import { ProductItemCart } from '../interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { StorageService } from './storage.service';
import { map } from 'rxjs';


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
    products:[],
    loaded:false
  }

  // loadProducts = this._storageService
  //   .loadProducts()
  //   .pipe(map((pro)))



  // ESTO INICIA Y MAPEA LOS CAMBIOS
  state = signalSlice({
    // con este estado inicia
    initialState:this.initialState
  })

}
