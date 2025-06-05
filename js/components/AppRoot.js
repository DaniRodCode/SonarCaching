import { GestorPantallas, Pantalla} from '../services/GestorPantallas.js';
import { PantallaSeleccionarRuta } from './PantallaSeleccionarRuta.js';
import { PantallaBuscarPunto } from './PantallaBuscarPunto.js';
import { PantallaPuntoEncontrado } from './PantallaPuntoEncontrado.js';

customElements.define('pantalla-seleccionar-ruta', PantallaSeleccionarRuta);
customElements.define('pantalla-buscar-punto', PantallaBuscarPunto);
customElements.define('pantalla-punto-encontrado', PantallaPuntoEncontrado);

Pantalla.contenidoGlobal = `
<style>

  :host {
    --color-fondo: #FFFBDE;
    --color-texto: #ffffff;
    --color-primario: #90D1CA;
    --color-secundario: #129990;
    --color-gris: #b0b0b0;
    --font-base: system-ui;

    font-family: var(--font-base);
    background-color: var(--color-fondo);
    color: var(--color-texto);
    margin: 0;
    padding: 0;
    line-height: 1.5;
    overflow-y: auto;
  }

  .color-blanco { color: white; }
  .color-fondo { color: var(--color-fondo); } 
  .color-texto { color: var(--color-texto); } 
  .color-primario { color: var(--color-primario); } 
  .color-secundario { color: var(--color-secundario); } 

  .sombra { text-shadow: 0 0px 12px rgba(0, 0, 0, 0.5);  }
  
  .pantalla-titulo {
    font-size: 10rem;
    font-weight: 600;
    text-align: center;
    line-height: .8em;
  }
  
  .pantalla-titular {
    font-size: 5rem;
    font-weight: 500;
    text-align: center;
    line-height: 5rem;
    top: 10rem;
  }

  .pantalla-descripcion {
    font-size: 4rem;
    line-height: 5rem;
    text-align: center;
    margin: 2rem;
  }
  

  .pantalla-logo {
    background: url('./assets/DaniRod-logo.svg');
    width: 10vw;
    height: 10vw;
    max-width: 75px;
    max-height: 75px;

    position: absolute;
    bottom:50px;
    right:0;    
    margin:20px;
    mix-blend-mode: multiply;        
    opacity: 0.2;
  }

  

  .pantalla-menu {
    display:flex;
    justify-content: flex-end;
    column-gap: 2rem;
    width: 100%;
    position: absolute;
    top:0;
    padding-right: .5em;
    padding-top: .5em;
    padding-bottom: .5em;
    font-size: 2rem;
    background: #aaaaaa33;
    color:white;
    text-align: right;
    z-index: 999999;
    mix-blend-mode: difference;        
  }


  button {    
    background: linear-gradient(135deg, var(--color-primario), var(--color-secundario));
    border: none;
    border-radius: 8px;
    padding: 1rem;
    color: white;
    font-size: 3rem;
    font-weight: 500;
    cursor: pointer;
    transition: transform 0.2s ease, box-shadow 0.2s ease;
  }
  
  button:hover {
    transform: scale(1.05);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  }  

  .centrado {
    display: flex;
    justify-content: center;
    align-items: center;            
  }

  .arriba {
    display: flex;
    justify-content: center;
    align-items: flex-start;    
  }

  .fullscreen { 
    position: absolute;
    width: 100%;
    height: 100%;
  }

  .fondo {
    z-index:-1;
  }

</style>
`;  

export class AppRoot extends HTMLElement {
  static estado = {
    rutaActual: null,
    indicePunto: null,
    sonarInterval: null,
    distanciaActual: null,
  };  

  static instancia = document.querySelector('app-root');
  static pantallaSeleccionarRuta = null;
  static pantallaBuscarPunto = null;
  static pantallaPuntoEncontrado = null;




  static iniciar() {
    console.log("AppRoot::iniciar");
    this.pantallaSeleccionarRuta = this.crearPantalla('pantalla-seleccionar-ruta');
    this.pantallaBuscarPunto = this.crearPantalla('pantalla-buscar-punto');
    this.pantallaPuntoEncontrado = this.crearPantalla('pantalla-punto-encontrado');

    this.pantallaSeleccionarRuta.addEventListener("rutaSeleccionada", (e) => {
      console.log("AppRoot:ruta seleccionada ",e.detail);
      this.iniciarRuta(e.detail);
      this.siguientePunto();
    });

    this.pantallaBuscarPunto.addEventListener("puntoEncontrado", () =>
      this.puntoActualAlcanzado());

    this.pantallaPuntoEncontrado.addEventListener("siguientePunto", () =>
      this.siguientePunto());


    GestorPantallas.mostrar(this.pantallaSeleccionarRuta);
  }



  static crearPantalla(nombre) {
    const pantalla = document.createElement(nombre);
    
    this.instancia.append(pantalla);   
    GestorPantallas.registrar(pantalla);
    
    return pantalla;
  }

  static puntoActual() {
    return this.estado.rutaActual.obtenerPunto(this.estado.indicePunto);
  }




  static iniciarRuta(ruta) {
    console.log("AppRoot::iniciarRuta",ruta);
    this.estado.rutaActual = ruta;
    this.estado.indicePunto = -1;
  }


  static siguientePunto() {
    console.log("AppRoot::siguientePunto", this.estado);
    this.estado.indicePunto++;
    const puntoActual = this.puntoActual();

    if (!puntoActual) {
      GestorPantallas.mostrar(this.pantallaSeleccionarRuta);
      return;
    }

    if (puntoActual.sinCoordenadas()) {
      this.puntoActualAlcanzado();
      return;
    }
    
    this.pantallaBuscarPunto.iniciar(this.puntoActual());
    GestorPantallas.mostrar(this.pantallaBuscarPunto);
  }


  static puntoActualAlcanzado() {
    console.log("AppRoot::puntoActualAlcanzado", this.estado);

    this.pantallaPuntoEncontrado.iniciar(this.puntoActual());
    GestorPantallas.mostrar(this.pantallaPuntoEncontrado);
  }


}




