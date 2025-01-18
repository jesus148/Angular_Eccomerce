import { Component, input, output } from '@angular/core';
import { ProductItemCart } from '../../../shared/interfaces/product.interface';
import { CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-cart-item',
  standalone: true,
  // importacion pipe
  imports: [CurrencyPipe],
  templateUrl: './cart-item.component.html',
  styleUrl: './cart-item.component.scss'
})
export class CartItemComponent {

  // COMPONENTE PARA MOSTRAR CADA OBJETO DEL CARRITO DE COMPRAS


  // entrada de data
  // productCartItem : esta variable debe ponerse al llamar a este componente desde otro componente
  // input.required<ProductItemCart> : esto es el parametro q debe recibir
  productCartItem = input.required<ProductItemCart>();

  // salida de data
  // funcion remover
  onRemove = output<number>();

    // salida de data
  // incremento
  onIncrease = output<number>();

    // salida de data
  // decremento
  onDecrese = output<ProductItemCart>();





}
