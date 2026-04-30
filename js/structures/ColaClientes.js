import Nodo from "../model/Nodo.js";

export default class ColaClientes {
    constructor() {
        this.frente = null;
        this.final = null;
        this.size = 0;
    }

    encolar(cliente) {
        const nuevoNodo = new Nodo(cliente);

        if (this.estaVacia()) {
            this.frente = nuevoNodo;
            this.final = nuevoNodo;
        } else {
            this.final.siguiente = nuevoNodo;
            this.final = nuevoNodo;
        }

        this.size++;
    }

    desencolar() {
        if (this.estaVacia()) {
            return null;
        }

        const clienteEliminado = this.frente.dato;
        this.frente = this.frente.siguiente;
        this.size--;

        if (this.frente === null) {
            this.final = null;
        }

        return clienteEliminado;
    }

    verPrimero() {
        if (this.estaVacia()) {
            return null;
        }

        return this.frente.dato;
    }

    estaVacia() {
        return this.frente === null;
    }

    tamaño() {
        return this.size;
    }

    toArray() {
        const clientes = [];
        let actual = this.frente;

        while (actual !== null) {
            clientes.push(actual.dato);
            actual = actual.siguiente;
        }

        return clientes;
    }

    cargarDesdeArray(clientes) {
        this.vaciar();

        for (const cliente of clientes) {
            this.encolar(cliente);
        }
    }

    vaciar() {
        this.frente = null;
        this.final = null;
        this.size = 0;
    }
}