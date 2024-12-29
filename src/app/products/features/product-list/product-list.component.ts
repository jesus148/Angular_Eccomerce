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




  // metodo cambiar la paginacion
  changePage(){

    // console.log(this.productService.state.page() );

    // suma el valor para hacer el cambio de paginacion
    const page = this.productService.state.page() + 1 ;

    // Cualquier componente o servicio que esté escuchando este Subject podrá reaccionar al cambio de página y realizar las actualizaciones necesarias.
    this.productService.changePage$.next(page);
  }


}
