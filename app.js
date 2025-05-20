// app.js
// Módulo principal de la aplicación GPS Radar

const RUTAS = [
  {
    titulo: "Ruta 1",
    descripcion: "Primera ruta",
    imagen: null,
    puntos: [
      { lat: 37.8765, lon: -4.7801, imagen:null, mensaje: "Has llegado al punto 1." },
      { lat: 37.8772, lon: -4.7810, imagen:null, mensaje: "Has llegado al punto 2." }
    ]
  },
];

let estado = {
  rutaActual: null,
  indicePunto: 0,
  sonarInterval: null,
  distanciaActual: null,
};

// =================== CONTROL DE PANTALLAS ===================
function mostrarPantalla(id) {
  document.querySelectorAll('.pantalla').forEach(div => div.classList.add('oculto'));
  document.getElementById(id).classList.remove('oculto');
}

// =================== SELECCIÓN DE RUTA ===================
function cargarRutas() {
  const ul = document.getElementById('listaRutas');

  RUTAS.forEach((ruta, index) => {
    const li = document.createElement('li');
    const btn = document.createElement('button');

    btn.textContent = ruta.titulo;
    btn.onclick = () => seleccionarRuta(index);

    li.appendChild(btn);
    ul.appendChild(li);
  });
}


function seleccionarRuta(indice) {
  estado.rutaActual = RUTAS[indice];
  estado.indicePunto = 0;
  mostrarInfoPuntoActual();
}


// =================== INFORMACIÓN DEL PUNTO ===================
function mostrarInfoPuntoActual() {
  const punto = obtenerPuntoActual();
  document.getElementById('tituloPunto').textContent = `Punto ${estado.indicePunto + 1}`;
  document.getElementById('descripcionPunto').textContent = punto.mensaje;
  mostrarPantalla('pantallaPunto');
}



// =================== NAVEGACIÓN ===================
function iniciarNavegacion() {
  mostrarPantalla('pantallaNavegacion');
  iniciarSonar();
  actualizarDistanciaPeriodicamente();
}

function obtenerPuntoActual() {
  return estado.rutaActual.puntos[estado.indicePunto];
}

function actualizarDistancia() {
  // Para pruebas: usa una posición simulada
  const posicionActual = { lat: 37.8760, lon: -4.7800 };
  const objetivo = obtenerPuntoActual();
  
  const distancia = calcularDistancia(posicionActual.lat, posicionActual.lon, objetivo.lat, objetivo.lon);
  estado.distanciaActual = distancia;
  
  document.getElementById('distancia').textContent = distancia.toFixed(1);

  if (distancia < 3) {
    document.getElementById('puntoAlcanzado').disabled = false;
  } else {
    document.getElementById('puntoAlcanzado').disabled = true;
  }
}

function actualizarDistanciaPeriodicamente() {
  setInterval(actualizarDistancia, 1000);
}

// =================== SONAR ===================
function iniciarSonar() {
  estado.sonarInterval = setInterval(() => {
    if (estado.distanciaActual == null) return;
    const intervalo = Math.max(300, Math.min(3000, estado.distanciaActual * 10));
    emitirSonido();
  }, 1000);
}

function emitirSonido() {
  const ctx = new (window.AudioContext || window.webkitAudioContext)();
  const osc = ctx.createOscillator();
  const gain = ctx.createGain();
  osc.type = 'sine';
  osc.frequency.value = 1000;
  gain.gain.setValueAtTime(0.1, ctx.currentTime);
  gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.2);
  osc.connect(gain);
  gain.connect(ctx.destination);
  osc.start();
  osc.stop(ctx.currentTime + 0.2);
}

// =================== FINALIZAR PUNTO ===================
function marcarPuntoComoAlcanzado() {
  estado.indicePunto++;
  if (estado.indicePunto >= estado.rutaActual.puntos.length) {
    alert("¡Ruta completada!");
    mostrarPantalla('pantallaSeleccion');
  } else {
    mostrarInfoPuntoActual();
  }
}

// =================== UTILIDADES ===================
function calcularDistancia(lat1, lon1, lat2, lon2) {
  const R = 6371000;
  const dLat = toRad(lat2 - lat1);
  const dLon = toRad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon / 2) * Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

function toRad(grados) {
  return grados * Math.PI / 180;
}

// =================== EVENTOS ===================
document.getElementById('iniciarNavegacion').addEventListener('click', iniciarNavegacion);
document.getElementById('puntoAlcanzado').addEventListener('click', marcarPuntoComoAlcanzado);

// =================== INICIALIZACIÓN ===================
cargarRutas();
mostrarPantalla('pantallaSeleccion');
