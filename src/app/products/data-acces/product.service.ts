
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { BaseHttpService } from '../../shared/data-acces/base-http.service';
import { Observable } from 'rxjs';
import { Product } from '../../shared/interfaces/product.interface';

// productService hereda de BaseHttpService
@Injectable({providedIn: 'root'})
export class productService extends BaseHttpService {



  // metodo obtiene
  // los metodos obtiene del BaseHttpService
    getProduct():Observable<Product[]>{
       return this.http.get<any[]>(`${this.api_url}/products`)
    }





  // inyectando
  // private http=inject(HttpClient);

  // constructor() { }

  // // obtiene todo
  // getProduct(){
  //   return this.http.get('https://fakestoreapi.com/products')
  // }

}
