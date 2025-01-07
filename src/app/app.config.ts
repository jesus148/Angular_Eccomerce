import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, withComponentInputBinding } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [
    // detección de cambios basada en para la aplicación iniciada mediante bootstrapApplication.
    provideZoneChangeDetection({ eventCoalescing: true }),




         // withComponentInputBinding :a facilitar el enlace de inputs (propiedades) de componentes en rutas cuando trabajas en aplicaciones con el enfoque standalone.
    // withComponentInputBinding() : para recibir parametros mediante la url al componente
    provideRouter(routes, withComponentInputBinding()),
     provideHttpClient(), //para usar servicios rest

    ]
};
