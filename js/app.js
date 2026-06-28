import BancoService from "./services/BancoService.js";
import * as render from "./ui/render.js";

const bancoService = new BancoService();

function actualizarInterfaz() {
    try {
        const estado = bancoService.obtenerEstado();
        render.renderTodo(estado);
    } catch (error) {
        console.error("Error al actualizar la interfaz:", error);
    }
}

actualizarInterfaz();

document.getElementById("form-cliente").addEventListener("submit", (e) => {
    e.preventDefault();
    
    const nombreInput = document.getElementById("nombre");
    const tramiteInput = document.getElementById("tramite");
    
    const nombre = nombreInput.value.trim();
    const tramite = tramiteInput.value;

    if (!nombre || !tramite) {
        alert("Por favor complete todos los campos");
        return;
    }

    try {
        bancoService.registrarCliente(nombre, tramite);
        
        nombreInput.value = "";
        tramiteInput.value = "";
        
        actualizarInterfaz();
    } catch (error) {
        alert(error.message);
    }
});

document.getElementById("btn-atender").addEventListener("click", () => {
    try {
        const cliente = bancoService.atenderSiguiente();
        if (!cliente) {
            alert("No hay clientes disponibles en la cola o ya hay un cliente en atención.");
        }
        actualizarInterfaz();
    } catch (error) {
        console.error("Error al traer siguiente cliente:", error);
    }
});

document.getElementById("btn-finalizar").addEventListener("click", () => {
    try {
        const cliente = bancoService.finalizarClienteActual();
        if (!cliente) {
            alert("No hay cliente en atención para finalizar.");
        }
        actualizarInterfaz();
    } catch (error) {
        console.error("Error al finalizar cliente en atención:", error);
    }
});

document.getElementById("btn-deshacer").addEventListener("click", () => {
    try {
        const cliente = bancoService.deshacerUltimaAccion();
        if (!cliente) {
            alert("No hay acciones para deshacer");
        }
        actualizarInterfaz();
    } catch (error) {
        console.error("Error al deshacer:", error);
    }
});

document.getElementById("btn-limpiar-historial").addEventListener("click", () => {
    if (confirm("¿Está seguro de que desea limpiar todo el historial?")) {
        try {
            bancoService.reiniciarSistema();
            actualizarInterfaz();
        } catch (error) {
            console.error("Error al limpiar:", error);
        }
    }
});