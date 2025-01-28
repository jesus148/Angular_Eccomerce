import { Component, inject } from '@angular/core';
import { ProductService } from '../../../shared/data-acces/product-state.service';
import { ProductCardComponent } from '../../ui/product-card/product-card.component';
import { CarteStateService } from '../../../shared/data-acces/cart-state.service';
import { Product } from '../../../shared/interfaces/product.interface';

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



  // <!-- COMPONENTE MUESTRA TODO EL LISTADO DE PRODUCTOS -->

  // // inyecta servicio
  public productService = inject(ProductService);


  // inyecta el servicio
  // cuando inyectas este servicio el signalSlice se ejecuta hasta
  // sources
  cartState=inject(CarteStateService).state;


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




  // agregando al carrito
  // recibes el product del product-addComponent
  addToCart(product :Product){
    // llama al servicio osea el add del actionsorces
    // solo envia el action$: Observable<ProductItemCart> el 2 parametro
    this.cartState.add({
      product, //producto
      quantity:1 //cantidad
    })
  }





}
