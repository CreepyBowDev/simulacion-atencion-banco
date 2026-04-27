import Nodo from "../model/Nodo.js";

export default class ListaAtendidos {
    constructor() {
        this.cabeza = null;
        this.size = 0;
    }

    insertarFinal(cliente) {
        const nuevoNodo = new Nodo(cliente);

        if (this.estaVacia()) {
            this.cabeza = nuevoNodo;
        } else {
            let actual = this.cabeza;

            while (actual.siguiente !== null) {
                actual = actual.siguiente;
            }

            actual.siguiente = nuevoNodo;
        }

        this.size++;
    }

    buscarPorTicket(ticket) {
        let actual = this.cabeza;

        while (actual !== null) {
            if (actual.dato.ticket === ticket) {
                return actual.dato;
            }
            actual = actual.siguiente;
        }

        return null;
    }

    estaVacia() {
        return this.cabeza === null;
    }

    tamaño() {
        return this.size;
    }

    toArray() {
        const atendidos = [];
        let actual = this.cabeza;

        while (actual !== null) {
            atendidos.push(actual.dato);
            actual = actual.siguiente;
        }

        return atendidos;
    }

    cargarDesdeArray(clientes) {
        this.limpiar();

        for (const cliente of clientes) {
            this.insertarFinal(cliente);
        }
    }

    limpiar() {
        this.cabeza = null;
        this.size = 0;
    }
}