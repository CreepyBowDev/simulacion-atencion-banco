export function renderCola(clientes) {
    const colaElement = document.getElementById("cola-contenedor");
    colaElement.innerHTML = "";

    if (!clientes || clientes.length === 0) {
        colaElement.innerHTML = "<div class='empty-message'>No hay clientes en espera</div>";
    } else {
        clientes.forEach(cliente => {
            const clienteElement = document.createElement("div");
            clienteElement.className = "client-card";
            clienteElement.innerHTML = `
                <span class="ticket">${cliente.ticket}</span>
                <div class="info">
                    <span class="nombre">${cliente.nombre}</span>
                    <span class="tramite">${cliente.tramite}</span>
                    <span class="hora-ticket">🕒 ${cliente.horaLlegada || "—"}</span>
                </div>
            `;
            colaElement.appendChild(clienteElement);
        });
    }
}

export function renderHistorial(historial) {
    const historialElement = document.getElementById("historial-contenedor");
    historialElement.innerHTML = "";
    if (!Array.isArray(historial) || historial.length === 0) {
        historialElement.innerHTML = "<div class='empty-message'>No hay clientes atendidos aún</div>";
    } else {
        historial.forEach(cliente => {
            if (cliente && cliente.ticket && cliente.nombre && cliente.tramite && cliente.estado) {
                const clienteElement = document.createElement("div");
                clienteElement.className = "client-card";
                clienteElement.innerHTML = `
                    <span class="ticket">${cliente.ticket}</span>
                    <div class="info">
                        <span class="nombre">${cliente.nombre}</span>
                        <span class="tramite">${cliente.tramite}</span>
                        <span class="estado">${cliente.estado}</span>
                        <span class="hora-ticket">🕒 ${cliente.horaLlegada || "—"}</span>
                    </div>
                `;
                historialElement.appendChild(clienteElement);
            } else {
                console.warn("Cliente con datos inválidos:", cliente);
            }
        });
    }
}

export function renderClienteActual(cliente) {
    const contenedor = document.getElementById("cliente-actual-contenedor");

    if (cliente) {
        contenedor.innerHTML = `
            <div class="client-current-content">
                <div class="ticket-display">${cliente.ticket}</div>
                <div class="client-info">${cliente.nombre}</div>
                <div class="tramite-badge">${cliente.tramite}</div>
                <div class="hora-ticket">🕒 ${cliente.horaLlegada || "—"}</div>
            </div>
        `;
    } else {
        contenedor.innerHTML = "<div class='empty-message'>⚡ No hay cliente en atención</div>";
    }
}

export function renderEstadisticas(estadisticas) {
    document.getElementById("total-espera").textContent = estadisticas.totalEnEspera || 0;
    document.getElementById("total-atendidos").textContent = estadisticas.totalAtendidos || 0;
    document.getElementById("ultima-accion").textContent = estadisticas.ultimaAccion ? estadisticas.ultimaAccion.tipo : "---";
    document.getElementById("siguiente-ticket").textContent = estadisticas.contadorTickets || 1;
}

export function renderTodo(estado) {
    renderCola(estado.cola);
    renderHistorial(estado.historial);
    renderClienteActual(estado.clienteActual);
    renderEstadisticas(estado);
}