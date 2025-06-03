import { Pantalla } from '../services/GestorPantallas.js';
import { Ruta } from '../services/Ruta.js';

export class PantallaSeleccionarRuta extends Pantalla {

  connectedCallback() {
    this.rutas = null;

    this.contenido(`
        <style>

          :host {
            background: #eee;
          }

          #listaRutas {
            width: 50%;
            display: grid;
            row-gap: 1em;
          }

        </style>

        <div class="logo"></div>
        <div class="titulo">Sonar Caching</div>
        <div id="listaRutas"></div>
        <div class="pie">Ayuda</div>
    `);

    this.rutas = this.cargarRutas();
    this.mostrarRutas();
  }

  cargarRutas() {
    const datosRutas = [
      {
        titulo: "Ruta 1",
        imagen: null,
        puntos: [
          { lat: null, lon: null, imagen:null, titulo:"Ruta 1 punto 0", mensaje: "Inicio de la ruta 1" },
          { lat: 37.87741566635104, lon: -4.766528674714567, imagen:null, titulo:"Eroski", mensaje: "Has llegado al Eroski" },
          { lat: 37.873922178320555, lon: -4.771847831283576, imagen:null, titulo:"Casa", mensaje: "Has llegado a casa" },
          { lat: null, lon: null, imagen:null, titulo:"Fin ruta 1", mensaje: "Fin de la ruta 1" },
        ]
      }, 
      {
        titulo: "Ruta 2",
        imagen: null,
        puntos: [
          { lat: null, lon: null, imagen:null, titulo:"Ruta 2 punto 0", mensaje: "Inicio de la ruta 2" },
          { lat: 37.8765, lon: -4.7801, imagen:null, titulo:"Ruta 2 Punto 1", mensaje: "Has llegado al punto 1." },
          { lat: 37.8772, lon: -4.7810, imagen:null, titulo:"Ruta 2 Punto 2", mensaje: "Has llegado al punto 2." },
          { lat: null, lon: null, imagen:null, titulo:"Fin ruta 2", mensaje: "Fin de la ruta 2" },
        ]
      },
      {
        titulo: "Ruta 3",
        imagen: null,
        puntos: [
          { lat: null, lon: null, imagen:null, titulo:"Ruta 3 punto 0", mensaje: "Inicio de la ruta 3" },
          { lat: 37.8765, lon: -4.7801, imagen:null, titulo:"Ruta 3 Punto 1", mensaje: "Has llegado al punto 1." },
          { lat: 37.8772, lon: -4.7810, imagen:null, titulo:"Ruta 3 Punto 2", mensaje: "Has llegado al punto 2." },
          { lat: null, lon: null, imagen:null, titulo:"Fin ruta 3", mensaje: "Fin de la ruta 3" },
        ]
      },
    ];

    const rutas = [];

    datosRutas.forEach((datosRuta) => {
      rutas.push(new Ruta(datosRuta));
    });

    return rutas;
  }


  mostrarRutas() {
    const listaRutas = this.elementoId('listaRutas');
  
    this.rutas.forEach((ruta) => {
      const btn = document.createElement('button');
  
      btn.textContent = ruta.titulo;
      btn.onclick = () => this.generarEvento("rutaSeleccionada", ruta);
  
      listaRutas.appendChild(btn);
    });
  }
    

}
