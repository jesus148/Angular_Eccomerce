import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';

@Injectable({providedIn: 'root'})
export class BaseHttpService {

  // inyectando
  http = inject(HttpClient);

  // puerto del back
  api_url= environment.API_URL;



}
