import Cliente from "../js/model/Cliente.js";
import ColaClientes from "../js/structures/ColaClientes.js";
import ListaAtendidos from "../js/structures/ListaAtendidos.js";
import PilaAcciones from "../js/structures/PilaAcciones.js";

function testColaClientes(){
    let cola = new ColaClientes();
    //(ticket, nombre, tramite, horaLlegada, estado = "En espera")
    let client1 = new Cliente({ ticket: "A-001", nombre: "Jesus", tramite: "Deposito", estado: "En espera"});
    let client2 = new Cliente({ ticket: "A-002", nombre: "Carlos", tramite: "Retiro", estado: "Atendido"});
    let client3 = new Cliente({ ticket: "A-003", nombre: "Manuel", tramite: "Prestamo", estado: "En espera"});

    cola.encolar(client1);
    cola.encolar(client2);
    cola.encolar(client3);

    console.log(cola.toArray());

    cola.desencolar();
    console.log(cola.toArray());
    console.log(cola.verPrimero());
    console.log("Tamaño actual: " + cola.tamaño());

    //ColaClientes funciona bien
};

testColaClientes();