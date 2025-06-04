export class GestorPantallas {
  static pantallas = [];
  static actual = null;

  static registrar(pantalla) {
    this.pantallas.push(pantalla);
  }

  static mostrar(pantalla) {
    if (this.actual) this.actual.ocultar();

    this.actual = pantalla;
    this.actual.mostrar();
  }

}



export class Pantalla extends HTMLElement {
  static contenidoGlobal = "";
  
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.innerHTML =`
      <style>

        :host {
          display: block;            /* para que se comporte como bloque */
          position: fixed;           /* fijo para ocupar toda la pantalla */
          top: 0;
          left: 0;
          width: 100vw;              /* ancho viewport */
          height: 100vh;             /* alto viewport */
          margin: 0;
          padding: 0;
          box-sizing: border-box;
          overflow: hidden;          /* evita scroll si hay contenido extra */
          z-index: 1000;             /* para que esté encima */
        }

        :host(.activa)        { display: block;  }
        :host(:not(.activa))  { display: none;   }

        #contenedor {
          width: 100%;
          height: 100%;
          display: flex;          
          flex-direction: column;
          align-items: center;
          justify-content: center;
          row-gap: 10rem;
        }           
        
      </style>      

      <div id="contenedor"></div>  

      ${Pantalla.contenidoGlobal}
    `;
  }

  insertarContenido(html) {
    this.shadowRoot.querySelector("#contenedor").innerHTML += html;
  }

  contenido(html) {
    this.shadowRoot.querySelector("#contenedor").innerHTML = html;
  }

  elementoId(id) { 
    return this.shadowRoot.querySelector("#"+id);
  }

  mostrar() {
    this.classList.add('activa');
  }

  ocultar() {
    this.classList.remove('activa');
  }

  generarEvento(nombre, detail) {        
    this.dispatchEvent(new CustomEvent(nombre, { 
      detail: detail,
    }));
  }


}
