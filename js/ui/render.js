/**
 * render.js
 * Módulo encargado de actualizar el DOM según los datos del sistema.
 * No toma decisiones de negocio, solo recibe datos y pinta.
 */

// Contenedores del DOM
const DOM = {
    clienteActual: document.getElementById('cliente-actual-contenedor'),
    colaContainer: document.getElementById('cola-contenedor'),
    historialContainer: document.getElementById('historial-contenedor'),
    totalEspera: document.getElementById('total-espera'),
    totalAtendidos: document.getElementById('total-atendidos'),
    ultimaAccion: document.getElementById('ultima-accion'),
    siguienteTicket: document.getElementById('siguiente-ticket'),
    mensajesArea: document.getElementById('mensajes-area')
};

/**
 * Muestra el cliente actual (si existe)
 * @param {Object|null} cliente - Objeto con datos del cliente o null
 */
export function renderClienteActual(cliente) {
    if (!cliente || !cliente.ticket) {
        DOM.clienteActual.innerHTML = `<div class="empty-message">⚡ No hay cliente en atención</div>`;
        return;
    }
    const html = `
        <div class="client-card" style="border-left-color: #2a9d8f;">
            <div><span class="ticket">🎫 Ticket #${cliente.ticket}</span> <strong>${escapeHtml(cliente.nombre)}</strong></div>
            <div>📋 Trámite: ${escapeHtml(cliente.tramite)}</div>
            <div>⏱️ Hora llegada: ${cliente.horaLlegada || '--:--'}</div>
            <div>🟢 Estado: ${escapeHtml(cliente.estado || 'En atención')}</div>
        </div>
    `;
    DOM.clienteActual.innerHTML = html;
}

/**
 * Renderiza la cola de espera (array de clientes)
 * @param {Array} colaClientes - Arreglo de objetos cliente
 */
export function renderCola(colaClientes) {
    if (!colaClientes || colaClientes.length === 0) {
        DOM.colaContainer.innerHTML = `<div class="empty-message">No hay clientes en espera</div>`;
        return;
    }
    let html = '';
    colaClientes.forEach(cliente => {
        html += `
            <div class="client-card">
                <div><span class="ticket">🎫 Ticket #${cliente.ticket}</span> <strong>${escapeHtml(cliente.nombre)}</strong></div>
                <div>📋 ${escapeHtml(cliente.tramite)}</div>
                <div>⏱️ ${cliente.horaLlegada || '--:--'} | ${escapeHtml(cliente.estado || 'En espera')}</div>
            </div>
        `;
    });
    DOM.colaContainer.innerHTML = html;
}

/**
 * Renderiza el historial de atendidos (proviene de lista enlazada -> array)
 * @param {Array} historialArray - Lista de clientes atendidos
 */
export function renderHistorial(historialArray) {
    if (!historialArray || historialArray.length === 0) {
        DOM.historialContainer.innerHTML = `<div class="empty-message">No hay clientes atendidos aún</div>`;
        return;
    }
    let html = '';
    historialArray.forEach(cliente => {
        html += `
            <div class="client-card" style="border-left-color: #6c757d; opacity:0.9">
                <div><span class="ticket" style="background:#6c757d;">✅ #${cliente.ticket}</span> <strong>${escapeHtml(cliente.nombre)}</strong></div>
                <div>📋 ${escapeHtml(cliente.tramite)}</div>
                <div>⏱️ Atendido: ${cliente.horaAtencion || cliente.horaLlegada || '--:--'}</div>
            </div>
        `;
    });
    DOM.historialContainer.innerHTML = html;
}

/**
 * Actualiza las estadísticas (espera, atendidos, última acción, siguiente ticket)
 * @param {Object} stats - { enEspera, totalAtendidos, ultimaAccionTexto, siguienteTicket }
 */
export function renderEstadisticas(stats) {
    DOM.totalEspera.innerText = stats.enEspera ?? 0;
    DOM.totalAtendidos.innerText = stats.totalAtendidos ?? 0;
    DOM.ultimaAccion.innerText = stats.ultimaAccionTexto || '---';
    DOM.siguienteTicket.innerText = stats.siguienteTicket ?? '1';
}

/**
 * Renderiza un mensaje temporal en el área de notificaciones
 * @param {string} texto - Mensaje a mostrar
 * @param {string} tipo - 'success', 'error', 'info'
 * @param {number} duracionMs - tiempo en milisegundos (por defecto 3000)
 */
let timeoutMsg = null;
export function renderMensaje(texto, tipo = 'info', duracionMs = 3000) {
    if (timeoutMsg) clearTimeout(timeoutMsg);
    DOM.mensajesArea.className = 'messages-area';
    DOM.mensajesArea.classList.add(tipo);
    DOM.mensajesArea.innerText = texto;
    timeoutMsg = setTimeout(() => {
        DOM.mensajesArea.innerText = '';
        DOM.mensajesArea.className = 'messages-area';
    }, duracionMs);
}

/**
 * Renderiza todos los componentes de una sola vez
 * @param {Object} estado - Objeto completo del sistema (BancoService.obtenerEstado())
 */
export function renderTodo(estado) {
    if (!estado) return;
    renderClienteActual(estado.clienteActual);
    renderCola(estado.colaClientes || []);
    renderHistorial(estado.historialClientes || []);
    renderEstadisticas({
        enEspera: estado.enEspera,
        totalAtendidos: estado.totalAtendidos,
        ultimaAccionTexto: estado.ultimaAccionTexto,
        siguienteTicket: estado.siguienteTicket
    });
}

/**
 * Limpia los campos del formulario (nombre y selector)
 * @param {string} nombreInputId - id del input nombre
 * @param {string} tramiteSelectId - id del select
 */
export function limpiarFormulario(nombreInputId = 'nombre', tramiteSelectId = 'tramite') {
    const nombreInput = document.getElementById(nombreInputId);
    const tramiteSelect = document.getElementById(tramiteSelectId);
    if (nombreInput) nombreInput.value = '';
    if (tramiteSelect) tramiteSelect.value = 'Consulta'; // valor por defecto
    // Opcional: focus al nombre
    if (nombreInput) nombreInput.focus();
}

// Helper para evitar XSS
function escapeHtml(str) {
    if (!str) return '';
    return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}