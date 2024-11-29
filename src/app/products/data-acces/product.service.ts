
import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class productService {

  // inyectando
  private http=inject(HttpClient);

  constructor() { }

  // obtiene todo
  getProduct(){
    return this.http.get('https://fakestoreapi.com/products')
  }

}
