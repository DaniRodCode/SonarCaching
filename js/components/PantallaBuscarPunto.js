import { GestorPantallas, Pantalla } from '../services/GestorPantallas.js';


export class PantallaBuscarPunto extends Pantalla {

  connectedCallback() {    
    this.posicionObjetivo = null;
    this.posicionActual = null;
    this.distancia = null;
    this.sonarInterval = null;
    this.gpsInterval = null;
    this.distanciaInterval = null;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.ultimaEmision = Date.now();


    this.contenido(`
        <style>

          #distancia {
            font-size:8em;
            font-family: system-ui;
          }

          #alertaVisual {
            display: flex;
            justify-content: center;
            align-items: center;
            width:100%;
            height: 100%;
          }
          
          #circulo {
            width: 50vw;
            height: 50vw;
            background-color: red;
            border-radius: 50%;
            transition: transform 0.2s ease-out;
          }

          @keyframes pulso {
            0%   { transform: scale(1); }
            50%  { transform: scale(1.5); }
            100% { transform: scale(1); }
          }
        </style>


        <div id="titulo" class="titulo"></div>
        <div id="alertaVisual">
          <div id="circulo"></div>
        </div>        
        <div id="distancia"></div>
    `);

      this.circulo = this.shadowRoot.querySelector('#circulo');

  }
  
  iniciar(posicion) {
    console.log("PantallaBuscarPunto::iniciar", posicion);
    this.posicionObjetivo = posicion;

    this.elementoId('titulo').textContent = posicion.titulo;
    this.actualizarDistancia();

    this.iniciarSonar();
    this.iniciarSeguimientoGPS();
    this.actualizarDistanciaPeriodicamente();    
  }  
  

  actualizarDistancia() {
    this.distancia = this.posicionObjetivo.distancia(this.posicionActual);
    
    if (!this.distancia) {
      this.mostrarDistancia("---");
      return;
    }
 
    this.mostrarDistancia(this.distancia);
  
    if (this.distancia < 3)
      this.puntoEncontrado();
  }


  puntoEncontrado() {
    clearInterval(this.distanciaInterval);
    clearInterval(this.sonarInterval);
    this.detenerSeguimientoGPS();
    this.generarEvento("puntoEncontrado");
  } 

  
  actualizarDistanciaPeriodicamente() {
    this.distanciaInterval = setInterval(() => {this.actualizarDistancia()}, 500);
  }


  mostrarDistancia(distancia) {
    const textoDistancia = isNaN(distancia) ? "---" : distancia.toFixed(1) + "m";

    this.elementoId('distancia').textContent = textoDistancia;
  }

  

  iniciarSeguimientoGPS() {
    if (!navigator.geolocation) {
      alert("Tu navegador no soporta geolocalización.");
      return;
    }
  
    this.gpsInterval = navigator.geolocation.watchPosition(
      (position) => {
        this.posicionActual = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };
      },
      (error) => {
        console.error("Error de geolocalización:", error.message);
      },
      {
        enableHighAccuracy: true,
        maximumAge: 0,
        timeout: 10000,
      }
    );
  }

  detenerSeguimientoGPS() {
    if (this.gpsInterval !== null) {
      navigator.geolocation.clearWatch(this.gpsInterval);
      this.gpsInterval = null;
    }
  }  


  iniciarSonar() {
    this.sonarInterval = setInterval(() => {
      const ahora = Date.now();
      const intervalo = this.distancia ? Math.min(this.distancia*10,1000) : 9999999;

      if (ahora - this.ultimaEmision > intervalo) {
        this.emitirSonido();
        this.animarAlertaVisual();
        this.ultimaEmision = ahora;
      }
    }, 100); 
  }


  emitirSonido() {
    const audioContext = this.audioContext;
    const o = audioContext.createOscillator();
    const g = audioContext.createGain();
    o.type = "sine";
    o.frequency.value = 1000;
    g.gain.setValueAtTime(0.2, audioContext.currentTime);
    g.gain.exponentialRampToValueAtTime(0.0001, audioContext.currentTime + 0.1);
    o.connect(g);
    g.connect(audioContext.destination);
    o.start();
    o.stop(audioContext.currentTime + 0.1);
  }
  

  animarAlertaVisual() {
    this.circulo.style.animation = 'none';
    void this.circulo.offsetWidth; 
    this.circulo.style.animation = 'pulso 0.1s ease-out';

    console.log(this.posicionActual,this.posicionObjetivo);
  }  

}
