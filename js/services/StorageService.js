export default class StorageService {
    constructor(clave = "estadoBanco") {
        this.clave = clave;
    }

    guardarEstado(estado) {
        try {
            const estadoJSON = JSON.stringify(estado);
            localStorage.setItem(this.clave, estadoJSON);
            return true;
        } catch (error) {
            console.error("Error al guardar el estado en localStorage:", error);
            return false;
        }
    }

    cargarEstado() {
        try {
            const estadoJSON = localStorage.getItem(this.clave);

            if (!estadoJSON) {
                return null;
            }

            return JSON.parse(estadoJSON);
        } catch (error) {
            console.error("Error al cargar el estado desde localStorage:", error);
            return null;
        }
    }

    limpiarEstado() {
        try {
            localStorage.removeItem(this.clave);
            return true;
        } catch (error) {
            console.error("Error al limpiar el estado en localStorage:", error);
            return false;
        }
    }
}