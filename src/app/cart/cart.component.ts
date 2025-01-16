import { Component, inject } from '@angular/core';
import { CartItemComponent } from './ui/cart-item/cart-item.component';
import { CarteStateService } from '../shared/data-acces/cart-state.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  // importando pa usar un componente dentro de otro
  imports: [CartItemComponent],
  templateUrl: './cart.component.html',
  styles: ``
})
export default class CartComponent {

  // inyectando servicio
  state=inject(CarteStateService).state;
}
