import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { CarteStateService } from '../../data-acces/cart-state.service';

// selector
@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
  styles: ``
})
// clase
export class HeaderComponent {


  // <!-- BARRA DE NAVEGACION -->


  // inyectando servicio del carrito
  cartState = inject(CarteStateService).state;

}
