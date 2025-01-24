import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CarteStateService } from '../shared/data-acces/cart-state.service';
import { ProductItemCart } from '../shared/interfaces/product.interface';

@Component({
  selector: 'app-cart',
  standalone: true,
  // importando pa usar un componente dentro de otro
  imports: [CartItemComponent],
  templateUrl: './cart.component.html',
  styles: ``
})
export default class CartComponent {

  // COMPONENTE PARA CARRITO DE COMPRAS


  // inyectando servicio
  state=inject(CarteStateService).state;


  // metodo eliminar un producto del carrito
  // recibe el id
  onRemove(id :number){
    // ejecuta el metodo remove del actionsources
    // el metodo remove tiene todos parametro , pero solo enviamos el id
    this.state.remove(id);
  }




  // metodo
  // metodo para sumar en el carrito de compras
  // product:ProductItemCart :parametro
  onIncrease(product:ProductItemCart){
    // this.state.udpate : metodo del actionSources
    // solo enviamos el parametro action$: Observable<ProductItemCart>
    this.state.udpate({
      // le envia el mismo producto
      product:product.product,
      // y le suma la cantidad
      quantity:product.quantity + 1,
    })
  }




  // Metodo para restar productos del carrito de compras
  // product :ProductItemCart : parametro
  onDecrease(product :ProductItemCart){

    // this.state.udpate : metodo del actionSources
    // solo enviamos el parametro action$: Observable<ProductItemCart>
    this.state.udpate({
      //le envia el = mismo producto
      ...product,
      // y la cantidad q tenga le resta
      quantity : product.quantity - 1,
    })
  }










}
