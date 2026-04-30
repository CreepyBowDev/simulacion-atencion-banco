import Cliente from "../model/Cliente.js";
import Accion from "../model/Accion.js";
import ColaClientes from "../structures/ColaClientes.js";
import ListaAtendidos from "../structures/ListaAtendidos.js";
import PilaAcciones from "../structures/PilaAcciones.js";
import StorageService from "./StorageService.js";

export default class BancoService {
    constructor() {
        this.colaClientes = new ColaClientes();
        this.listaAtendidos = new ListaAtendidos();
        this.pilaAcciones = new PilaAcciones();
        this.storageService = new StorageService();

        this.clienteActual = null;
        this.contadorTickets = 1;

        this.cargarEstadoGuardado();
    }

    generarTicket() {
        const numero = String(this.contadorTickets).padStart(3, "0");
        this.contadorTickets++;
        return `A-${numero}`;
    }

    obtenerHoraActual() {
        return new Date().toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
        });
    }

    obtenerFechaHoraActual() {
        return new Date().toLocaleString();
    }

    guardarEstado() {
        this.storageService.guardarEstado(this.exportarEstado());
    }

    cargarEstadoGuardado() {
        const estadoGuardado = this.storageService.cargarEstado();

        if (estadoGuardado) {
            this.restaurarEstado(estadoGuardado);
        }
    }

    registrarCliente(nombre, tramite) {
        if (!nombre || !nombre.trim()) {
            throw new Error("El nombre del cliente es obligatorio.");
        }

        if (!tramite || !tramite.trim()) {
            throw new Error("El trámite del cliente es obligatorio.");
        }

        const cliente = new Cliente(
            this.generarTicket(),
            nombre.trim(),
            tramite.trim(),
            this.obtenerHoraActual(),
            "En espera"
        );

        this.colaClientes.encolar(cliente);
        this.guardarEstado();

        return cliente;
    }

    atenderSiguiente() {
        if (this.colaClientes.estaVacia()) {
            return null;
        }

        const cliente = this.colaClientes.desencolar();
        cliente.estado = "Atendido";

        this.listaAtendidos.insertarFinal(cliente);
        this.clienteActual = cliente;

        const accion = new Accion(
            "ATENDER_CLIENTE",
            cliente,
            this.obtenerFechaHoraActual()
        );

        this.pilaAcciones.push(accion);
        this.guardarEstado();

        return cliente;
    }

    deshacerUltimaAccion() {
        if (this.pilaAcciones.estaVacia()) {
            return null;
        }

        const ultimaAccion = this.pilaAcciones.pop();

        if (ultimaAccion.tipo === "ATENDER_CLIENTE") {
            const cliente = ultimaAccion.cliente;

            this.eliminarUltimoAtendido();
            cliente.estado = "En espera";
            this.reencolarAlFrente(cliente);
            this.clienteActual = null;

            this.guardarEstado();
            return cliente;
        }

        return null;
    }

    eliminarUltimoAtendido() {
        const atendidos = this.listaAtendidos.toArray();

        if (atendidos.length === 0) {
            return null;
        }

        const ultimoCliente = atendidos.pop();
        this.listaAtendidos.limpiar();
        this.listaAtendidos.cargarDesdeArray(atendidos);

        return ultimoCliente;
    }

    reencolarAlFrente(cliente) {
        const clientes = this.colaClientes.toArray();

        this.colaClientes.vaciar();
        this.colaClientes.encolar(cliente);

        for (const c of clientes) {
            this.colaClientes.encolar(c);
        }
    }

    obtenerClienteActual() {
        return this.clienteActual;
    }

    obtenerCola() {
        return this.colaClientes.toArray();
    }

    obtenerHistorial() {
        return this.listaAtendidos.toArray();
    }

    obtenerUltimaAccion() {
        return this.pilaAcciones.peek();
    }

    obtenerEstado() {
        return {
            clienteActual: this.obtenerClienteActual(),
            cola: this.obtenerCola(),
            historial: this.obtenerHistorial(),
            ultimaAccion: this.obtenerUltimaAccion(),
            totalEnEspera: this.colaClientes.tamaño(),
            totalAtendidos: this.listaAtendidos.tamaño(),
            contadorTickets: this.contadorTickets
        };
    }

    exportarEstado() {
        return {
            cola: this.colaClientes.toArray(),
            historial: this.listaAtendidos.toArray(),
            pila: this.pilaAcciones.toArray(),
            clienteActual: this.clienteActual,
            contadorTickets: this.contadorTickets
        };
    }

    restaurarEstado(estado) {
        if (!estado) {
            return;
        }

        this.colaClientes.cargarDesdeArray(estado.cola || []);
        this.listaAtendidos.cargarDesdeArray(estado.historial || []);
        this.pilaAcciones.cargarDesdeArray(estado.pila || []);
        this.clienteActual = estado.clienteActual || null;
        this.contadorTickets = estado.contadorTickets || 1;
    }

    reiniciarSistema() {
        this.colaClientes.vaciar();
        this.listaAtendidos.limpiar();
        this.pilaAcciones.vaciar();
        this.clienteActual = null;
        this.contadorTickets = 1;

        this.storageService.limpiarEstado();
    }
}