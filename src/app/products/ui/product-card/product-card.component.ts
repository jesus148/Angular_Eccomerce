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
  product = input.required<Product>();
}
