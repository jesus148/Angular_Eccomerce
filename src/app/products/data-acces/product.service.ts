
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-acces/base-http.service';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';


// limite de paginacion
const LIMIT = 5;

// productService hereda de BaseHttpService
@Injectable({providedIn: 'root'})
export class productService extends BaseHttpService {


  // SERVICIO QUE HACE LA PETICION TIENE LOS ENDPOINTS


  // metodo obtiene varios productos
  // los metodos obtiene del BaseHttpService
  // (page:number) : parametro para la paginacion
  // params : para enviar información adicional al servidor, como filtros, paginación, o criterios de búsqueda.
  // recordar q en si a tu backend le pides de esta forma https://fakestoreapi.com/products/1
  // solo q con params aqui lo pedimos de otra forma
    getProducts(page:number):Observable<Product[]>{
       return this.http.get<any[]>(`${this.apiUrl}/products`,{
        // para la paginacion
        params:{
          // limit sera el resultado de filas del array
          limit:page * LIMIT
        }
       })
    }




      // metodo solo obtiene 1 producto
      getProduct(id: string): Observable<Product> {
        return this.http.get<Product>(`${this.apiUrl}/products/${id}`);
      }








  }







