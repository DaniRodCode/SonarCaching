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

        <div class="pantalla-logo"></div>
        <div class="pantalla-titulo color-primario sombra">Sonar Caching</div>
        <div id="listaRutas"></div>
        <div class="pantalla-pie">Ayuda</div>
    `);

    this.rutas = this.cargarRutas();
    this.mostrarRutas();
  }


  /*
  {
      { lat: 37.87741566635104, lon: -4.766528674714567, imagen:null, titulo:"Eroski", mensaje: "Has llegado al Eroski" },
      { lat: 37.873922178320555, lon: -4.771847831283576, imagen:null, titulo:"Casa", mensaje: "Has llegado a casa" },
    ]
  }, 

  */
  cargarRutas() {
    const datosRutas = [
      {
        titulo: "Ruta por bares alternativos de Córdoba",
        imagen: 'https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Centro_Hist%C3%B3rico%2C_16.9_--_2023_--_C%C3%B3rdoba%2C_Espa%C3%B1a.jpg/1920px-Centro_Hist%C3%B3rico%2C_16.9_--_2023_--_C%C3%B3rdoba%2C_Espa%C3%B1a.jpg',
        puntos: [
          { lat: null, lon: null, imagen: 'https://www.turismodecordoba.org/sliders/2022/20220328140711.jpg?v=1749034415',
            titulo: "Bares alternativos de Córdoba",
            mensaje: "Bienvenidos a la ruta que os llevará por algunos bares con encanto alternativo en Córdoba."
          },
          { lat: 37.88069178538715, lon: -4.7740721814497435, imagen: 'https://static.eldiario.es/clip/b32bd2d1-92db-4cad-94c4-94d0f7ac3b67_16-9-discover-aspect-ratio_default_0.webp', 
            titulo: "Amapola",
            mensaje: "Bienvenido a Amapola, bar artístico con personalidad única y cócteles especiales."
          },
          { lat: 37.88416116515282, lon: -4.77631913123407, imagen: 'https://scontent-cdg4-1.xx.fbcdn.net/v/t39.30808-6/473248974_1108319357756860_2982636722346567259_n.jpg?_nc_cat=108&ccb=1-7&_nc_sid=cc71e4&_nc_ohc=N84mZzh10fgQ7kNvwF_C1wL&_nc_oc=AdnzkgaTdO51Mhl92x4qU5tj3WTM_EY58dLL-ch2-3lYhNQrUWMX3BAEZ2esvRpBVNI&_nc_zt=23&_nc_ht=scontent-cdg4-1.xx&_nc_gid=3pmx4T847bOCm2fE9Q8a7w&oh=00_AfLeP5-0G_6Vb9RrRzREWtrk930sf4cR018Bs4fkdMkncQ&oe=6845E1CA', 
            titulo: "El Último Tango",
            mensaje: "Has llegado a El Último Tango, un bar con ambiente íntimo y buena música."
          },
          { lat: 37.879149721825506, lon: -4.776408827821928, imagen: 'https://scontent-cdg4-2.xx.fbcdn.net/v/t39.30808-6/309707743_466133288901361_2138096436464250875_n.jpg?_nc_cat=107&ccb=1-7&_nc_sid=6ee11a&_nc_ohc=zhWGERJHHw4Q7kNvwGe_RdN&_nc_oc=AdmZIebnyn7RORi7-IYuTkownCL5eyQIxelosQzdcnyjetG70HZvG03bnBywMdS32WQ&_nc_zt=23&_nc_ht=scontent-cdg4-2.xx&_nc_gid=GHvPvFe5yqvw4qjJPfolIg&oh=00_AfKjPRMnQzgNAC--KrgDTLFyPzl5H8pryACl5xgfm8pyfA&oe=6845FB32', 
            titulo: "La Indiscreta",
            mensaje: "Has llegado a La Indiscreta, bar bohemio ideal para cerrar la ruta con buen rollo."
          },
          { lat: null, lon: null, imagen: 'https://images.pexels.com/photos/225228/pexels-photo-225228.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1', 
            titulo: "Fin de la ruta",
            mensaje: "¡Enhorabuena! Has completado la ruta por los bares alternativos de Córdoba. ¡Salud!"
          }
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
