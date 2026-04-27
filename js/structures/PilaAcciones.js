import Nodo from "../model/Nodo.js";

export default class PilaAcciones {
    constructor() {
        this.tope = null;
        this.size = 0;
    }

    push(accion) {
        const nuevoNodo = new Nodo(accion);
        nuevoNodo.siguiente = this.tope;
        this.tope = nuevoNodo;
        this.size++;
    }

    pop() {
        if (this.estaVacia()) {
            return null;
        }

        const accionEliminada = this.tope.dato;
        this.tope = this.tope.siguiente;
        this.size--;

        return accionEliminada;
    }

    peek() {
        if (this.estaVacia()) {
            return null;
        }

        return this.tope.dato;
    }

    estaVacia() {
        return this.tope === null;
    }

    tamaño() {
        return this.size;
    }

    toArray() {
        const acciones = [];
        let actual = this.tope;

        while (actual !== null) {
            acciones.push(actual.dato);
            actual = actual.siguiente;
        }

        return acciones;
    }

    cargarDesdeArray(acciones) {
        this.vaciar();

        for (let i = acciones.length - 1; i >= 0; i--) {
            this.push(acciones[i]);
        }
    }

    vaciar() {
        this.tope = null;
        this.size = 0;
    }
}