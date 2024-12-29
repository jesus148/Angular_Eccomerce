import { Component, effect, inject, input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [],
  templateUrl: './product-detail.component.html',
  styles: ``
})
export default  class ProductDetailComponent {


  id = input.required<string>();



  constructor(){
    effect(()=>{
      console.log(this.id());
    })
  }



  // OBTENIENDO EL ID POR PARAMETROS EN LA URL DE ESTE COMPONENTE pero usando el ActivatedRoute
  // ActivatedRoute
  // Proporciona acceso a información sobre una ruta asociada con un componente. que se carga en un tomacorriente. Úselo para atravesar el RouterState árbol y extraer información de los nodos., osea info de un component al ingresar osea te da los paramas algo asi
  // private activeRouter = inject(ActivatedRoute);

  // // inicia
  // constructor(){
  //   // osea al entrar a este componente te dara la info o params q pusiste por la url
  //   this.activeRouter.params.subscribe((params)=>{
  //     // printer el value
  //     console.log(params)
  //   })
  // }






}
