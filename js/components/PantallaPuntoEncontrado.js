import { GestorPantallas, Pantalla } from '../services/GestorPantallas.js';


export class PantallaPuntoEncontrado extends Pantalla {

  connectedCallback() {    
    this.contenido(`
        <style>

          .mensaje {
            font-size:8em;
            font-family: system-ui;
          }


        </style>

   
        <h1>Punto encontrado</h1>
        <div id="titulo" class="titulo"></div>
        <div id="mensaje" class="mensaje"></div>
        <button id="continuar">Continuar</button>
    `);

    this.elementoId('continuar').onclick = () => 
      this.generarEvento("siguientePunto");     
  }



  iniciar(punto) {
    console.log("PantallaPuntoEncontrado::mostrarPunto", punto);

    this.elementoId('titulo').textContent = punto.titulo;
    this.elementoId('mensaje').textContent = punto.mensaje;
  }
  
  
}
