import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';



// En Angular, el decorador @Injectable({providedIn: 'root'}) se utiliza para declarar que una clase es un servicio y puede ser inyectada en otros componentes, servicios, o directivas a través del sistema de Inyección de Dependencias de Angular.
@Injectable({
  providedIn: 'root'
})
export class BaseHttpService {

  // SERVICIO PARA PONER EL INJECT Y Y LOS ENVIROMENT



  // inyectando
  http = inject(HttpClient);

  // puerto del back
  apiUrl = environment.API_URL;



}
