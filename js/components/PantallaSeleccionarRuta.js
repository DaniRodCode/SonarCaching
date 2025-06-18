import { Pantalla } from '../services/GestorPantallas.js';
import { Ruta } from '../services/Ruta.js';

export class PantallaSeleccionarRuta extends Pantalla {

  async connectedCallback() {
    this.rutas = null;

    this.contenido(`
        <style>

          :host {
            padding:2rem !important;
          }

          #listaRutas {
            width: 100%;
            display: grid;
            justify-items: start;
          }

        </style>

        <div class="pantalla-menu">Ayuda</div>
        <div class="pantalla-logo"></div>
        <div class="pantalla-titulo color-blanco">Sonar Caching</div>
        <div id="listaRutas"></div>
    `);

    this.rutas = await this.cargarRutas();
    this.mostrarRutas();
  }


  async cargarRutas() {
    try {
      const res = await fetch('./data/rutas.json');
      const datosRutas = await res.json();
  
      const rutas = datosRutas.map(datos => new Ruta(datos));
      return rutas;
    } catch (error) {
      console.error('Error al cargar las rutas:', error);
      return [];
    }
  }

  mostrarRutas() {
    const listaRutas = this.elementoId('listaRutas');
    listaRutas.innerHTML = '';

    this.rutas.forEach((ruta) => {
      const contenedor = document.createElement('div');
      contenedor.classList.add('item-ruta');

      const btnSeleccionar = document.createElement('button');
      btnSeleccionar.textContent = ruta.titulo;
      btnSeleccionar.onclick = () => this.generarEvento("rutaSeleccionada", ruta);
      contenedor.appendChild(btnSeleccionar);

      listaRutas.appendChild(contenedor);
    });
  }


}
