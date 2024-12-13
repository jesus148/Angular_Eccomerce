import { Component, inject } from '@angular/core';
import { ProductService } from '../../../shared/data-acces/product-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [ProductCardComponent],
  templateUrl: './product-list.component.html',
  styles: ``,
  // providers : servicios de rest , este rest solo se usara aqui
  providers:[ProductService ]
})
// export default : exportando por defecto esta clase de controller
export default class ProductListComponent {

  // // inyecta servicio
  public productService = inject(ProductService);

  // // inicia
  // constructor() {
  //   this.productService.getProduct().subscribe( (products)=>{
  //     console.log(products);
  //   })
  // }



}
