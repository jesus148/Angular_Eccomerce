
import {inject, Injectable, Signal} from '@angular/core';
import { Product } from '../interfaces/product.interface';
import { signalSlice } from 'ngxtension/signal-slice';
import { productService } from '../../products/data-acces/product.service';
import { catchError, map, of, startWith, Subject, switchMap } from 'rxjs';
import { SIGNAL } from '@angular/core/primitives/signals';


// clase modelo
interface State{
  products :Product[];
  status:'loading'|'succes'| 'error';
  page:number
}


@Injectable()
export class ProductService{



  // SERVICIO PARA LISTAR TODOS LOS PRODUCTOS EN LA LISTA PRODUCTOS Y CAMBIAR SEGUN LA PAGINACION



  // inyectando el servicio
  public productService = inject(productService)


  // creando una interface
  public initialState: State = {
    products: [],  //vacio
    status: 'loading' as const,  //estado como loading q sea cons
    page:1
  };



  // DONDE SE SUPERVISA AL USUARIO
  // Un Subject es una clase de RxJS que actúa como un observable (puedes suscribirte a él) y también como un observer (puedes emitir valores a través de él).2. ¿Por qué usar un Subject?
// El Subject permite emitir manualmente eventos relacionados con el cambio de página. Por ejemplo:
// Si el usuario selecciona una nueva página en la interfaz, puedes llamar a this.changePage$.next(3) para indicar que la página seleccionada ahora es la 3.
// Cualquier parte de tu aplicación que esté suscrita al flujo de datos de changePage$ reaccionará automáticamente a este cambio.
  // Propósito: Este Subject servirá para emitir eventos que indiquen un cambio en la página seleccionada, probablemente en una lista paginada.
  // basicamente un subject escucha los eventos q realizara el usuario
  changePage$ = new Subject<number>();








  // ESTO MUESTRA LA DATA
  // pipe para manejar los observables osea mopdificarlos
  loadProduct$=this.changePage$.pipe(
    // inicia , parametro para la paginacion , este valor se le pasa al switchMap solo la 1 vez
    startWith(1),
    // switchMap: en RxJS es muy útil cuando trabajas con flujos de datos que pueden cancelarse. En términos sencillos, cuando llega un nuevo valor, switchMap cancela el flujo de datos anterior y empieza uno nuevo.
    // page es el valor que es el changePage$<number> osea el parametro
    // // (page)es el parametro de la paginacion inicia con el startWith y luego el valor que se le suma en el changePage
    switchMap((page)=> this.productService.getProducts(page)), // inicia , parametro para la paginacion


    // esto es lo que se muestra
    map((products)=>({products , status:'succes' as const})),

    // si hay error
    catchError( ()=>{
      // reseta los valores , cuando ocurre un error devuelve esto
      return of({
        products:[],
        status: 'error' as const,
      })
    })


  );








  // ESTO INICIA
    // por primera vez al renderizar el componente por primera vez y al hacer eventos el usuario
  // ESTE SIGNAL MAPEA LOS CAMBIOS
  // cualquier cambio en el getProduct()
  // cualquie cambio lo actualiza
  // el regresado state El objeto será un estándar. solo lectura señal, pero también tendrá propiedades adjuntas que se analizarán a continuación.
  // signalSlice solo actualizara un parte es lo contrario a un signal , osea el signalSlice es mas pequeño
  state = signalSlice({
    // ESTO INICIA
    // initialState : estado inicial en caso no haiga ningun estado o valor
    initialState:this.initialState,  //se pasa el estado
    // sources : colección de flujos de datos observablesutilizará para actualizar el estado de manera reactiva. Es parte del patrón reactivo que permite que los cambios en los datos sean automáticamente reflejados en el estado y, por ende, en la interfaz de usuario.
    // sources : Permite combinar múltiples Signals como fuente y crea un Signal derivado reactivo que depende de todos ellos. basicamente es para poner partes o valores de los signalslice , pero no mapea nada solo devuelve el valor total cuando se usa con el signalSlice
    sources:[
      // Este flujo transforma los valores emitidos por changePage$(en este caso, números de página) y los convierte en un objeto que actualiza el estado reactivo con:
      // La nueva página seleccionada (page).
      // Un estado de carga (status: 'loading'), que indica que los datos de la nueva página están siendo cargados.
      // osea es como vigila el changePage$ , esto saldra momentaneamente
      this.changePage$.pipe(
        map((page) =>({page, status:'loading' as const}))
      ),


      // AL FINAL MUESTRA ESTO
      // muestra el verdadero valor
      this.loadProduct$,

      // metodo obtiene todo product
      // Esto permite que cualquier cambio en los productos o el estado se refleje automáticamente en la interfaz.
      // this.productService
      // // (1):parametro para el limit
      // .getProduct(1)
      // // products : toda la data
      // .pipe(map((products) =>({products , status:'succes' as const})))
    ],
  });




}








// Conceptos

// subject :


// En Angular, RxJS (Reactive Extensions for JavaScript) proporciona herramientas poderosas para manejar flujos de datos asíncronos. Entre estas herramientas, Subject es una de las más importantes y utilizadas.

// ¿Qué es un Subject?
// Un Subject es un tipo especial de Observable que permite emitir y escuchar valores. A diferencia de un Observable normal, un Subject actúa tanto como Observable (se puede suscribir a él) como Observer (puede emitir valores).

// Características principales de Subject:
// Multicast: Un Subject envía los mismos valores a todos los suscriptores. Es decir, una vez que emite un valor, todos los que estén suscritos recibirán ese valor.
// Emitir manualmente: Con next(), puedes emitir valores manualmente.
// Comportamiento dual:
// Actúa como un Observable al que otros se pueden suscribir.
// Actúa como un Observer que puede emitir valores.

// ¡Claro! Vamos a ver signalSlice en acción con un ejemplo concreto y práctico en Angular usando la biblioteca Ngxtension.

// Ejemplo: Manejo de un objeto Signal con signalSlice
// Supongamos que tenemos un objeto user con información del usuario como nombre, edad y dirección.

// 1. Configuración inicial
// Primero, instalamos Ngxtension si aún no lo hemos hecho:

// bash
// Copiar código
// npm install @ngxtension/signals
// 2. Creación de Signals
// Creamos un Signal principal que contiene toda la información del usuario y usamos signalSlice para extraer partes específicas.

// app.component.ts:

// typescript
// Copiar código
// import { Component, signal } from '@angular/core';
// import { signalSlice } from '@ngxtension/signals';

// @Component({
//   selector: 'app-root',
//   template: `
//     <div>
//       <h1>Información del Usuario</h1>
//       <p><strong>Nombre:</strong> {{ name() }}</p>
//       <p><strong>Edad:</strong> {{ age() }}</p>
//       <p><strong>Ciudad:</strong> {{ city() }}</p>
//       <button (click)="updateUser()">Actualizar Usuario</button>
//     </div>
//   `,
// })
// export class AppComponent {
//   // Signal principal con un objeto de usuario
//   user = signal({
//     name: 'Juan Pérez',
//     age: 26,
//     address: {
//       city: 'Lima',
//       country: 'Perú',
//     },
//   });

//   // Usando signalSlice para extraer partes específicas del objeto
//   name = signalSlice(this.user, (state) => state.name); // Extrae el nombre
//   age = signalSlice(this.user, (state) => state.age); // Extrae la edad
//   city = signalSlice(this.user, (state) => state.address.city); // Extrae la ciudad

//   // Método para actualizar el usuario
//   updateUser() {
//     this.user.set({
//       name: 'María López',
//       age: 30,
//       address: {
//         city: 'Arequipa',
//         country: 'Perú',
//       },
//     });
//   }
// }
// 3. Explicación del código
// Signal principal:

// user es un Signal que contiene un objeto con el nombre, la edad y la dirección del usuario.
// signalSlice:

// signalSlice nos permite crear nuevos Signals derivados que observan partes específicas del estado:
// name → Observa solo el name del usuario.
// age → Observa solo la age del usuario.
// city → Accede a la propiedad anidada address.city.
// Actualización del Signal:

// Al hacer clic en el botón "Actualizar Usuario", el método updateUser actualiza el Signal principal user con un nuevo valor.
// Los Signals derivados (name, age, city) se actualizan automáticamente y el template refleja los cambios.
// 4. Template (HTML)
// En el template:

// Mostramos el nombre, la edad y la ciudad del usuario usando los Signals derivados.
// Agregamos un botón que actualiza los valores del usuario.
// 5. Salida en el navegador
// Estado inicial:
// makefile
// Copiar código
// Nombre: Juan Pérez
// Edad: 26
// Ciudad: Lima
// Después de hacer clic en "Actualizar Usuario":
// makefile
// Copiar código
// Nombre: María López
// Edad: 30
// Ciudad: Arequipa
// Resumen
// signalSlice permite extraer partes específicas de un objeto Signal.
// Los Signals derivados se actualizan automáticamente cuando el Signal principal cambia.
// Esto mejora la eficiencia y mantiene el código más limpio al evitar acceder directamente al objeto anidado en el template.







// parametros del signalSlice que son initialState y el sources
// En Ngxtension con signalSlice, hay parámetros adicionales como initialState y sources que permiten un mayor control sobre la creación del Signal derivado. Aquí te explico qué son y cómo funcionan con ejemplos prácticos.

// 1. initialState
// El parámetro initialState permite definir un valor inicial para el Signal derivado. Si la fuente (el Signal principal) aún no tiene un valor o el selector no encuentra lo esperado, el signalSlice devolverá este valor inicial en su lugar.

// Ejemplo con initialState
// Supongamos que trabajamos con un Signal que podría ser undefined o incompleto al inicio.

// Código ejemplo:

// typescript
// Copiar código
// import { Component, signal } from '@angular/core';
// import { signalSlice } from '@ngxtension/signals';

// @Component({
//   selector: 'app-root',
//   template: `
//     <div>
//       <h1>Información del Usuario</h1>
//       <p><strong>Nombre:</strong> {{ name() }}</p>
//       <button (click)="updateUser()">Actualizar Usuario</button>
//     </div>
//   `,
// })
// export class AppComponent {
//   // Signal principal, inicializado como undefined
//   user = signal<any>(undefined);

//   // signalSlice con valor inicial
//   name = signalSlice(this.user, (state) => state?.name, { initialState: 'Desconocido' });

//   // Método para actualizar el usuario
//   updateUser() {
//     this.user.set({
//       name: 'María López',
//       age: 30,
//     });
//   }
// }
// Explicación:
// Signal principal:
// Inicialmente, user no tiene ningún valor (undefined).

// initialState:

// Si el estado es undefined o la propiedad seleccionada (state?.name) no existe, el Signal derivado name mostrará el valor "Desconocido".
// Esto evita errores al acceder a propiedades nulas o indefinidas.
// Comportamiento:

// Antes de actualizar: name mostrará "Desconocido".
// Después de hacer clic en el botón: El Signal user se actualiza y name muestra "María López".
// 2. sources
// El parámetro sources permite combinar múltiples Signals como fuente de datos para crear un Signal derivado.

// Ejemplo con sources
// Supongamos que tenemos dos Signals, uno con el nombre del usuario y otro con su edad, y queremos combinarlos en un Signal derivado.

// Código ejemplo:

// typescript
// Copiar código
// import { Component, signal } from '@angular/core';
// import { signalSlice } from '@ngxtension/signals';

// @Component({
//   selector: 'app-root',
//   template: `
//     <div>
//       <h1>Información del Usuario</h1>
//       <p><strong>Resumen:</strong> {{ userSummary() }}</p>
//       <button (click)="updateData()">Actualizar Datos</button>
//     </div>
//   `,
// })
// export class AppComponent {
//   // Signals separados
//   firstName = signal('Juan');
//   age = signal(26);

//   // signalSlice usando múltiples sources
//   userSummary = signalSlice(
//     { sources: [this.firstName, this.age] },
//     (firstName, age) => `${firstName} tiene ${age} años.`
//   );

//   // Método para actualizar los datos
//   updateData() {
//     this.firstName.set('María');
//     this.age.set(30);
//   }
// }
// Explicación:
// Sources:

// Aquí sources recibe un arreglo de Signals: [this.firstName, this.age].
// Selector:

// La función (firstName, age) recibe los valores de los Signals en el mismo orden en que están en sources.
// Retorna una cadena combinada: "María tiene 30 años".
// Comportamiento:

// El Signal derivado userSummary se actualiza automáticamente cuando cualquiera de los Signals en sources (firstName o age) cambia.
// Ventaja:

// Puedes combinar múltiples Signals en un único Signal derivado sin tener que escribir lógica manualmente para observar cambios en cada uno.
// Resumen:
// initialState:
// Proporciona un valor inicial al Signal derivado cuando el selector no retorna un valor válido, evitando errores.

// sources:
// Permite combinar múltiples Signals como fuente y crea un Signal derivado reactivo que depende de todos ellos.





// ANGULAR SIGNAL

// En Angular, tanto signal como signalSlice son mecanismos útiles cuando trabajas con reactividad, pero tienen diferencias fundamentales en cómo funcionan y para qué se utilizan. Vamos a desglosar sus características y diferencias con ejemplos prácticos.

// 📌 signal: Signal básico
// signal es parte del sistema de señales en Angular.
// Permite crear un valor reactivo que mantiene su estado y notifica cambios automáticamente cuando se actualiza.
// Se utiliza principalmente para datos simples o complejos que necesitan reactuar en el template o en la lógica de la aplicación.
// Ejemplo de signal
// typescript
// Copiar código
// import { Component, signal } from '@angular/core';

// @Component({
//   selector: 'app-signal-demo',
//   template: `
//     <h1>Ejemplo de signal</h1>
//     <p>Contador: {{ count() }}</p>
//     <button (click)="increment()">Incrementar</button>
//   `,
// })
// export class SignalDemoComponent {
//   // Signal básico
//   count = signal(0);

//   increment() {
//     this.count.update((value) => value + 1);
//   }
// }
// 🔍 Explicación:
// signal:
// Creamos un Signal count con un valor inicial de 0.
// El método increment actualiza el valor del Signal.
// En el template:
// Usamos count() para obtener el valor reactivo.
// Comportamiento:
// Al hacer clic en el botón, el valor de count se incrementa y el template se actualiza automáticamente.
// 📌 signalSlice: Signal derivado
// signalSlice es una herramienta de Ngxtension.
// Se utiliza para extraer una parte específica (slice) de un Signal más complejo.
// Permite crear Signals derivados de un Signal principal sin necesidad de duplicar el estado ni observar manualmente las propiedades anidadas.
// Es útil cuando trabajas con objetos o estados grandes y quieres observar solo partes específicas.
// Ejemplo de signalSlice
// Supongamos que tenemos un objeto user con información del usuario:

// typescript
// Copiar código
// import { Component, signal } from '@angular/core';
// import { signalSlice } from '@ngxtension/signals';

// @Component({
//   selector: 'app-signal-slice-demo',
//   template: `
//     <h1>Ejemplo de signalSlice</h1>
//     <p>Nombre: {{ name() }}</p>
//     <p>Edad: {{ age() }}</p>
//     <button (click)="updateUser()">Actualizar Usuario</button>
//   `,
// })
// export class SignalSliceDemoComponent {
//   // Signal principal con objeto complejo
//   user = signal({
//     name: 'Juan Pérez',
//     age: 26,
//     address: { city: 'Lima', country: 'Perú' },
//   });

//   // signalSlice extrae propiedades específicas del Signal principal
//   name = signalSlice(this.user, (state) => state.name); // Solo el nombre
//   age = signalSlice(this.user, (state) => state.age);   // Solo la edad

//   updateUser() {
//     this.user.update((state) => ({
//       ...state,
//       name: 'María López',
//       age: 30,
//     }));
//   }
// }
// 🔍 Explicación:
// Signal principal:
// user es un Signal que contiene un objeto con varias propiedades (name, age, address).
// signalSlice:
// Crea Signals derivados (name y age) que solo observan partes específicas del objeto.
// Ventaja:
// Si el user cambia, solo se actualizan los Signals derivados relevantes.
// En el template:
// Usamos name() y age() para mostrar valores específicos.
// Comportamiento:
// Al actualizar el Signal principal user, los Signals derivados se actualizan automáticamente.
// 📊 Diferencias clave entre signal y signalSlice
// Aspecto	signal	signalSlice
// Propósito	Crea un valor reactivo independiente.	Extrae y observa una parte específica de un Signal existente.
// Uso principal	Estados simples o completos.	Estados complejos donde solo se necesita observar una sección.
// Actualización	Se actualiza directamente.	Se actualiza cuando el Signal fuente cambia.
// Reactividad	Reactivo en su totalidad.	Reactivo solo en la parte seleccionada.
// Dependencia	Parte del núcleo de Angular Signals.	Requiere la biblioteca Ngxtension.
// 🚀 Caso de uso práctico
// Usa signal:
// Cuando trabajas con valores simples o un estado completo que no necesita ser dividido.

// Usa signalSlice:
// Cuando tienes un objeto complejo y solo necesitas observar partes específicas del objeto. Esto mejora el rendimiento y evita acceder manualmente a propiedades anidadas.


















// .PIPE Y EL .MAPY Y EL  startWith

// Claro! Cuando trabajas con Subject en Angular (parte de RxJS), puedes usar operadores como .pipe, map, startWith y switchMap para manipular y transformar los flujos de datos. Vamos a desglosar cada uno de estos conceptos con ejemplos claros y prácticos.

// 📌 1. Subject: Breve repaso
// Un Subject en RxJS es una combinación de Observable y Observer:

// Observable: Puede emitir valores.
// Observer: Puede suscribirse para recibir esos valores.
// Se usa para compartir y emitir datos en tiempo real entre diferentes partes de la aplicación.

// 📌 2. .pipe
// El método .pipe se utiliza para encadenar operadores en un flujo de datos.
// Permite transformar, filtrar o manipular los valores que emite un Subject u Observable.

// Ejemplo básico con .pipe y map
// typescript
// Copiar código
// import { Component, OnInit } from '@angular/core';
// import { Subject } from 'rxjs';
// import { map } from 'rxjs/operators';

// @Component({
//   selector: 'app-subject-pipe',
//   template: `
//     <h1>Ejemplo de Subject con .pipe y map</h1>
//     <p>Resultado: {{ result }}</p>
//     <button (click)="emitValue()">Emitir valor</button>
//   `,
// })
// export class SubjectPipeComponent implements OnInit {
//   private mySubject = new Subject<number>();
//   result: number = 0;

//   ngOnInit() {
//     this.mySubject
//       .pipe(
//         map((value) => value * 2) // Multiplica el valor emitido por 2
//       )
//       .subscribe((transformedValue) => {
//         this.result = transformedValue;
//       });
//   }

//   emitValue() {
//     this.mySubject.next(10); // Emitimos el valor 10
//   }
// }
// 🔍 Explicación:
// Subject: mySubject emite valores.
// .pipe: Aplica operadores al flujo antes de que lleguen al subscribe.
// map: Transforma cada valor emitido multiplicándolo por 2.
// Resultado:
// Emitimos 10 → se transforma a 20 → se muestra en result.
// 📌 3. startWith
// El operador startWith permite emitir un valor inicial antes de que se reciban los valores emitidos por el Subject.

// Ejemplo con startWith
// typescript
// Copiar código
// import { Component, OnInit } from '@angular/core';
// import { Subject } from 'rxjs';
// import { map, startWith } from 'rxjs/operators';

// @Component({
//   selector: 'app-startwith',
//   template: `
//     <h1>Ejemplo con startWith</h1>
//     <p>Resultado: {{ result }}</p>
//     <button (click)="emitValue()">Emitir valor</button>
//   `,
// })
// export class StartWithExampleComponent implements OnInit {
//   private mySubject = new Subject<number>();
//   result: number = 0;

//   ngOnInit() {
//     this.mySubject
//       .pipe(
//         startWith(0), // Valor inicial
//         map((value) => value * 2)
//       )
//       .subscribe((transformedValue) => {
//         this.result = transformedValue;
//       });
//   }

//   emitValue() {
//     this.mySubject.next(5); // Emitimos el valor 5
//   }
// }
// 🔍 Explicación:
// startWith(0):
// Emite el valor inicial 0 antes que cualquier otro valor.
// map:
// Multiplica por 2 cualquier valor emitido.
// Resultado:
// Inicialmente muestra 0 (0 × 2 = 0).
// Al hacer clic y emitir 5, muestra 10.
// 📌 4. switchMap
// El operador switchMap se usa para cancelar el flujo anterior y suscribirse a un nuevo Observable cuando se emite un nuevo valor.

// Ejemplo con switchMap
// Supongamos que queremos realizar una solicitud HTTP simulada cada vez que emitimos un valor.

// typescript
// Copiar código
// import { Component } from '@angular/core';
// import { Subject, of } from 'rxjs';
// import { switchMap, delay } from 'rxjs/operators';

// @Component({
//   selector: 'app-switchmap',
//   template: `
//     <h1>Ejemplo con switchMap</h1>
//     <p>Resultado: {{ result }}</p>
//     <button (click)="emitValue()">Emitir valor</button>
//   `,
// })
// export class SwitchMapExampleComponent {
//   private mySubject = new Subject<number>();
//   result: string = '';

//   constructor() {
//     this.mySubject
//       .pipe(
//         switchMap((value) => {
//           // Simulamos una llamada HTTP con delay
//           return of(`Respuesta para valor: ${value}`).pipe(delay(1000));
//         })
//       )
//       .subscribe((response) => {
//         this.result = response;
//       });
//   }

//   emitValue() {
//     const randomValue = Math.floor(Math.random() * 10);
//     this.mySubject.next(randomValue); // Emitimos un valor aleatorio
//   }
// }
// 🔍 Explicación:
// switchMap:
// Cada vez que emitimos un valor, cancela el Observable anterior y se suscribe a uno nuevo.
// Simulación HTTP:
// Usamos of() para retornar un Observable con un valor simulado, y añadimos delay para emular el tiempo de espera.
// Resultado:
// Si emitimos valores rápidamente, solo el último valor emitido genera un resultado.
// 🚀 Resumen de operadores:
// Operador	Descripción	Uso común
// .pipe	Encadena operadores en un flujo.	Manipular o transformar valores.
// map	Transforma cada valor emitido.	Realizar cálculos o cambios simples.
// startWith	Emite un valor inicial antes de los valores reales.	Mostrar valores predeterminados.
// switchMap	Cancela el Observable anterior y suscribe al nuevo.	Llamadas HTTP o procesos asíncronos.
// Si necesitas más ejemplos o quieres combinar estos operadores, ¡dímelo! 😊 🚀




















// SWITCHMAP
// ¿Qué es switchMap?
// El operador switchMap en RxJS es muy útil cuando trabajas con flujos de datos que pueden cancelarse. En términos sencillos, cuando llega un nuevo valor, switchMap cancela el flujo de datos anterior y empieza uno nuevo.

// Imagina que estás haciendo búsquedas en un sitio web. Cada vez que escribes algo, el sistema realiza una búsqueda. Si escribes rápido y cambias lo que estás buscando, no quieres que la búsqueda anterior siga ejecutándose, solo que se ejecute la última que escribiste. Eso es lo que hace switchMap.

// Paso 1: El flujo básico
// Imagina que estás escribiendo en un campo de búsqueda, y cada vez que escribes, el sistema realiza una búsqueda. Si tú escribes "a", el sistema ejecuta la búsqueda para "a", pero si luego escribes "ab", el sistema debe cancelar la búsqueda de "a" y hacer la búsqueda para "ab". Si vuelves a escribir "abc", el sistema cancela la búsqueda de "ab" y hace la búsqueda de "abc".

// Paso 2: ¿Cómo funciona switchMap en este caso?
// Cuando escribes en el campo de búsqueda, el sistema recibe lo que escribes y lo convierte en una búsqueda, pero si antes había una búsqueda ejecutándose, la cancela y comienza una nueva.

// Para entender mejor esto, veamos un ejemplo sencillo:

// Ejemplo de switchMap:
// typescript
// Copiar código
// import { Component } from '@angular/core';
// import { Subject } from 'rxjs';
// import { switchMap, debounceTime } from 'rxjs/operators';

// @Component({
//   selector: 'app-switchmap-example',
//   template: `
//     <h1>Prueba de switchMap</h1>
//     <input type="text" (input)="onSearch($event)" placeholder="Escribe algo..." />
//     <p>Resultado: {{ result }}</p>
//   `,
// })
// export class SwitchMapExampleComponent {
//   private searchSubject = new Subject<string>();
//   result: string = '';

//   constructor() {
//     this.searchSubject
//       .pipe(
//         debounceTime(500), // Espera medio segundo después de que dejes de escribir
//         switchMap((searchTerm) => {
//           console.log('Buscando:', searchTerm);
//           return this.fakeHttpRequest(searchTerm); // Simula una búsqueda HTTP
//         })
//       )
//       .subscribe((response) => {
//         this.result = response; // Muestra el resultado de la búsqueda
//       });
//   }

//   onSearch(event: Event) {
//     const searchTerm = (event.target as HTMLInputElement).value;
//     this.searchSubject.next(searchTerm); // Emitimos lo que el usuario escribe
//   }

//   // Simula una búsqueda HTTP
//   fakeHttpRequest(searchTerm: string) {
//     return new Observable<string>((observer) => {
//       setTimeout(() => {
//         observer.next(`Resultado para "${searchTerm}"`);
//         observer.complete();
//       }, 1000); // Simula que tarda 1 segundo
//     });
//   }
// }
// Explicación paso a paso:
// searchSubject:

// Es un Subject que escucha lo que el usuario escribe en el campo de búsqueda.
// Cada vez que el usuario escribe algo, se emite un nuevo valor (next).
// debounceTime(500):

// Este operador espera 500 milisegundos después de que el usuario deje de escribir antes de hacer algo. Así evitamos hacer demasiadas búsquedas cuando el usuario escribe rápido.
// switchMap:

// Cuando el usuario escribe algo nuevo, el operador switchMap:
// Cancela la búsqueda anterior (si la había) y inicia una nueva con el nuevo término de búsqueda.
// En este caso, llamamos a fakeHttpRequest, que simula una llamada HTTP de búsqueda.
// fakeHttpRequest:

// Esta función simula hacer una llamada a un servidor y devuelve un Observable que emite el resultado de la búsqueda después de 1 segundo.
// Suscripción:

// En la suscripción (subscribe), mostramos el resultado de la búsqueda en el navegador.
// ¿Qué hace realmente switchMap?
// Si el usuario escribe "a", se ejecuta la búsqueda para "a".
// Si luego escribe "ab", se cancela la búsqueda para "a" y se ejecuta la búsqueda para "ab".
// Si escribe "abc", se cancela la búsqueda para "ab" y se ejecuta la búsqueda para "abc".
// Ejemplo de lo que pasa:
// El usuario escribe: "a" → El sistema ejecuta la búsqueda para "a".
// El usuario escribe: "ab" → El sistema cancela la búsqueda de "a" y ejecuta la búsqueda para "ab".
// El usuario escribe: "abc" → El sistema cancela la búsqueda de "ab" y ejecuta la búsqueda para "abc".
// ¿Por qué es útil switchMap?
// En situaciones donde se generan varias solicitudes al mismo tiempo (como cuando el usuario escribe rápidamente en un campo de búsqueda), switchMap asegura que solo se ejecute la última solicitud, cancelando las anteriores. Esto es útil para no perder tiempo procesando búsquedas que ya no son relevantes.

// Espero que ahora esté más claro. Si aún tienes dudas o necesitas más ejemplos, ¡dímelo! 😊
