
export class Punto {  

  constructor(data) {
    this.data = data;
    this.titulo = data.titulo;
    this.mensaje = data.mensaje;
    this.lat = data.lat;
    this.lon = data.lon;
    this.imagen = data.imagen;
  }

  sinCoordenadas() {
    return (this.lat == null && this.lon == null);
  }


  distancia(objetivo) {
    if (!objetivo) return false;

    const {lat, lon} = objetivo;
    const R = 6371000;
    const dLat = toRad(lat - this.lat);
    const dLon = toRad(lon - this.lon);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(toRad(this.lat)) * Math.cos(toRad(lat)) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  }
  

  
}


export class Ruta {

  constructor(data) {
    this.data = data;
    this.titulo = data.titulo;
    this.imagen = data.imagen;
    this.puntos = this.crearPuntos(data.puntos);
  }


  crearPuntos(datosPuntos) {
    const puntos = [];

    datosPuntos.forEach((datosPunto) => {
      puntos.push(new Punto(datosPunto));
    });

    return puntos;    
  }

  obtenerPunto(indice) {
    return this.puntos[indice];
  }

}

function toRad(grados) {
  return grados * Math.PI / 180;
}