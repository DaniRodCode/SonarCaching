import { GestorPantallas, Pantalla } from '../services/GestorPantallas.js';


export class PantallaPuntoEncontrado extends Pantalla {

  connectedCallback() {    
    this.contenido(`
        <style>
        
        #mensaje {
          background: #00000061;
          border-radius: 35px;
          padding: 1rem;
        }

        #imagen {
          position: absolute;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          object-position: center;
        }

        </style>

        <img id="imagen" class="fullscreen fondo">
        <div>          
          <div id="titulo" class="pantalla-titular color-blanco sombra"></div>
          <div id="mensaje" class="pantalla-descripcion color-blanco"></div>
        </div>
        <button id="continuar">Continuar</button>
    `);

    this.elementoId('continuar').onclick = () => 
      this.generarEvento("siguientePunto");     
  }



  iniciar(punto) {
    console.log("PantallaPuntoEncontrado::mostrarPunto", punto);

    this.elementoId('imagen').src = punto.imagen;
    this.elementoId('titulo').textContent = punto.titulo;
    this.elementoId('mensaje').textContent = punto.mensaje;
  }
  
  
}
