import { GestorPantallas, Pantalla } from '../services/GestorPantallas.js';


export class PantallaBuscarPunto extends Pantalla {

  connectedCallback() {    
    this.punto = null;
    this.posicionActual = null;
    this.distancia = null;
    this.sonarInterval = null;
    this.distanciaInterval = null;
    this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
    this.ultimaEmision = Date.now();


    this.contenido(`
        <h1>Buscando punto</h1>
        <div id="titulo"></div>
        <div id="alertaVisual"></div>
        <div id="distancia"></div>
        <button id="moverN">↑ Norte</button>
        <button id="moverO">← Oeste</button>
        <button id="moverE">→ Este</button>
        <button id="moverS">↓ Sur</button>        
        <button id="continuar">Continuar</button>
    `);

    this.elementoId('continuar').onclick = () => 
      this.puntoEncontrado();

    this.elementoId('moverN').onclick = () => this.mover('N');
    this.elementoId('moverO').onclick = () => this.mover('O');
    this.elementoId('moverE').onclick = () => this.mover('E');
    this.elementoId('moverS').onclick = () => this.mover('S');
  }
  
  iniciar(punto) {
    console.log("PantallaBuscarPunto::iniciar", punto);
    this.punto = punto;
    this.posicionActual = { lat: 37.8760, lon: -4.7800 };    

    this.elementoId('titulo').textContent = punto.titulo;
    this.actualizarDistancia();

    this.iniciarSonar();
    this.actualizarDistanciaPeriodicamente();    
  }  
  

  actualizarDistancia() {
    // Para pruebas: usa una posición simulada
    this.actualizarPosicionActual();
    this.distancia = this.punto.distancia(this.posicionActual);
    
    this.mostrarDistancia();

    if (this.distancia < 3)
      this.puntoEncontrado();
  }

  actualizarPosicionActual() {
  }


  puntoEncontrado() {
    clearInterval(this.distanciaInterval);
    clearInterval(this.sonarInterval);
    this.generarEvento("puntoEncontrado");
  }

  
  actualizarDistanciaPeriodicamente() {
    this.distanciaInterval = setInterval(() => {this.actualizarDistancia()}, 500);
  }

  mostrarDistancia() {
    this.elementoId('distancia').textContent = this.distancia.toFixed(1) + "m";
  }

  

  iniciarSonar() {
    this.sonarInterval = setInterval(() => {
      const ahora = Date.now();
      const intervalo = this.distancia*10;

      if (ahora - this.ultimaEmision > intervalo) {
        this.emitirSonido();
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
  


  mover(direccion) {
    const paso = 0.0001;
    let {lat, lon} = this.posicionActual;
    console.log({lat,lon});

    if (direccion === 'N') lat += paso;
    if (direccion === 'S') lat -= paso;
    if (direccion === 'E') lon += paso;
    if (direccion === 'O') lon -= paso;

    this.posicionActual = {lat, lon};
  }


}
