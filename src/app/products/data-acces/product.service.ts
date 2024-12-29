
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-acces/base-http.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';


// limite de paginacion
const LIMIT = 5;

// productService hereda de BaseHttpService
@Injectable({providedIn: 'root'})
export class productService extends BaseHttpService {


  // SERVICIO QUE HACE LA PETICION


  // metodo obtiene
  // los metodos obtiene del BaseHttpService
  // (page:number) : parametro para la paginacion
  // params : para enviar información adicional al servidor, como filtros, paginación, o criterios de búsqueda.
  // recordar q en si a tu backend le pides de esta forma https://fakestoreapi.com/products/1
  // solo q con params aqui lo pedimos de otra forma
    getProduct(page:number):Observable<Product[]>{
       return this.http.get<any[]>(`${this.api_url}/products`,{
        // para la paginacion
        params:{
          // limit sera el resultado de filas del array
          limit:page * LIMIT
        }
       })
    }





  // inyectando
  // private http=inject(HttpClient);

  // constructor() { }

  // // obtiene todo
  // getProduct(){
  //   return this.http.get('https://fakestoreapi.com/products')
  // }



  // obtendra solo 1 producto
  getProductOne(id:number):Observable<Product>{
    return this.http.get<Product>(`${this.api_url}/products/${id}`)
  }




}
