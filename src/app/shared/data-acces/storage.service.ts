import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { ProductItemCart } from '../interfaces/product.interface';

@Injectable({providedIn: 'root'})
export class StorageService {


  // Metodo obtener del localStorage
  // Observable<ProductItem[] : lo q devuelve
  loadProducts():Observable<ProductItemCart[]>{

    // lo q se encuentre en el localstorge
    // en el localStorage como un objeto json recordar
    const rowProducts = localStorage.getItem('products');

    // evaluacion si existe data en el rowProducts
    // JSON.parse: conmvierte de un objeto json en un objeto de js
    return of(rowProducts ? JSON.parse(rowProducts): [])
  }


  // Metodo guardar productos en el local storage
  // void : no devuevel nada
  saveProducts(products : ProductItemCart[]):void{
    // convierte en un obejto de json
    localStorage.setItem('products', JSON.stringify(products));
  }

}
