import { Component, input, output } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {



// <!-- COMPONENTE MUESTRA CADA CARD DE PRODUCTO -->

  // entrada de data
  // <Product> = igual a la variable en el componente q lo envia
  // recordar q obtenemos la data solo de producto
  product = input.required<Product>();


  // salida hacia afuera
  // (addToCart) : igual la variable en el product-list.html
  addToCart = output<Product>();


  // event: Event : es el evento del click en la vista
  add(event: Event) {
    // stopPropagation :este es solo para button , osea el hijo, fuera del button lo detiene
    event.stopPropagation();
    // event.preventDefault():
    // Por ejemplo, si este botón estuviera dentro de un formulario, el comportamiento predeterminado sería enviar el formulario al presionar el botón. Esto evita que eso ocurra.
    event.preventDefault();

    // envias el producto recibido para la salida
    this.addToCart.emit(this.product());
  }



}
