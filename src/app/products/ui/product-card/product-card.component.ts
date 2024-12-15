import { Component, input } from '@angular/core';
import { Product } from '../../../shared/interfaces/product.interface';

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [],
  templateUrl: './product-card.component.html',
  styles: ``
})
export class ProductCardComponent {

  // entrada de data
  // <Product> = igual a la variable en el componente q lo envia
  // recordar q obtenemos la data solo de producto
  product = input.required<Product>();
}
