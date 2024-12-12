import { Component, inject } from '@angular/core';
import { productService } from '../../data-acces/product.service';

@Component({
  selector: 'app-product-list',
  standalone: true,
  imports: [],
  templateUrl: './product-list.component.html',
  styles: ``,
  // providers : servicios de rest , este rest solo se usara aqui
  providers:[productService]
})
// export default : exportando por defecto esta clase de controller
export default class ProductListComponent {

  // // inyecta servicio
  // private productService = inject(productService);

  // // inicia
  // constructor() {
  //   this.productService.getProduct().subscribe( (products)=>{
  //     console.log(products);
  //   })
  // }



}
