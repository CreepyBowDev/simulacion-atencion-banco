// js/app.js - Archivo de prueba para validar render.js
import * as Render from './ui/render.js';

// Datos simulados (como si vinieran de BancoService)
const estadoSimulado = {
    clienteActual: {
        ticket: 101,
        nombre: "María González",
        tramite: "Préstamo",
        horaLlegada: "10:30:25",
        estado: "En atención"
    },
    colaClientes: [
        { ticket: 102, nombre: "Carlos Ruiz", tramite: "Retiro", horaLlegada: "10:32:10", estado: "En espera" },
        { ticket: 103, nombre: "Ana Méndez", tramite: "Consulta", horaLlegada: "10:35:45", estado: "En espera" },
        { ticket: 104, nombre: "Luis Torres", tramite: "Depósito", horaLlegada: "10:40:20", estado: "En espera" }
    ],
    historialClientes: [
        { ticket: 99, nombre: "Javier Pérez", tramite: "Retiro", horaAtencion: "10:15:00" },
        { ticket: 100, nombre: "Sofía Ramírez", tramite: "Consulta", horaAtencion: "10:25:30" }
    ],
    enEspera: 3,
    totalAtendidos: 2,
    ultimaAccionTexto: "Cliente atendido: Ticket #101",
    siguienteTicket: 105
};

// Función que se ejecuta al cargar la página
document.addEventListener('DOMContentLoaded', () => {
    // Pintar toda la interfaz con datos simulados
    Render.renderTodo(estadoSimulado);
    Render.limpiarFormulario();  // Deja el formulario vacío
    Render.renderMensaje("✅ Modo prueba: interfaz funcionando correctamente", "success", 5000);
});

// Simular interacción con botones (solo para pruebas)
document.getElementById('btn-atender').addEventListener('click', () => {
    Render.renderMensaje("🔔 Simulación: Se atendió al siguiente cliente", "info");
    // Aquí después vendrá la lógica real de BancoService
});

document.getElementById('btn-deshacer').addEventListener('click', () => {
    Render.renderMensaje("↩️ Simulación: Se deshizo la última acción", "info");
});

document.getElementById('btn-limpiar-historial').addEventListener('click', () => {
    Render.renderMensaje("🧹 Simulación: Historial limpiado", "warning");
});