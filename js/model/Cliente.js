export default class Cliente {
  constructor({ ticket, nombre, tramite, horaLlegada, estado = "En espera" }) {
    this.ticket = ticket;
    this.nombre = nombre;
    this.tramite = tramite;
    this.horaLlegada = horaLlegada;
    this.estado = estado;
  }
}