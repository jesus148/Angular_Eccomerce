import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    // withComponentInputBinding :a facilitar el enlace de inputs (propiedades) de componentes en rutas cuando trabajas en aplicaciones con el enfoque standalone.
     provideRouter(routes , withComponentInputBinding()),
     provideHttpClient(), //para usar servicios resr
    ]
};
