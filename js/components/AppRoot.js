import { GestorPantallas, Pantalla} from '../services/GestorPantallas.js';
import { PantallaSeleccionarRuta } from './PantallaSeleccionarRuta.js';
import { PantallaBuscarPunto } from './PantallaBuscarPunto.js';
import { PantallaPuntoEncontrado } from './PantallaPuntoEncontrado.js';

customElements.define('pantalla-seleccionar-ruta', PantallaSeleccionarRuta);
customElements.define('pantalla-buscar-punto', PantallaBuscarPunto);
customElements.define('pantalla-punto-encontrado', PantallaPuntoEncontrado);

Pantalla.contenidoGlobal = `
<style>
  .titulo {
    font-size: 10em;
    font-family: sans-serif;
    text-align: center;
    font-weight: bold;
    line-height: .8em;
  }

  .logo {
    width: 10vw;
    height: 10vw;
    background: red;
    position: absolute;
    top:0;
    right:0;            
  }

  .pie {
    width: 100%;
    position: absolute;
    bottom:0;
    padding-right: .5em;
    padding-top: .5em;
    padding-bottom: .5em;
    font-size: 2em;
    background: black;
    color:white;
    text-align: right;
    opacity: .2;            
  }

  button {  
    font-size: 3em;   
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




