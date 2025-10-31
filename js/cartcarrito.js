//Maneja la logica del carrito
import { renderizarCarrito } from "./interfaz.js";
import { leerCarrito, guardarCarrito } from "./storage.js";

let carrito = leerCarrito() || [];

function agregarAlCarrito (producto){
    const item = carrito.find(p => p.id === producto.id);

    if (item) {
        item.cantidad++;
    } else {
        carrito.push({...producto, cantidad: 1});
    }

    guardarCarrito(carrito);
    renderizarCarrito(carrito);
}

//el .filter crea un array nuevo con todos los productos que estan en el carrito que no tengan el
//idProducto mencionado
function eliminarDelCarrito(idProducto) {
    carrito = carrito.filter(p => p.id !== idProducto);

    guardarCarrito(carrito);
    renderizarCarrito(carrito);
}


function calcularTotal () {
    return carrito.reduce((acc, p) => acc + p.precio * p.cantidad, 0);
}


function vaciarCarrito (){
    carrito = [];

    guardarCarrito(carrito);
    renderizarCarrito(carrito);
}

function actualizarCantidad (id, action){
    const producto = carrito.find(p => p.id ===id);;
    if (!producto) return;

    if (action === "incrementar") {
        producto.cantidad++;
    } else if (action === "decrementar" && producto.cantidad > 1) {
        producto.cantidad--;
    } else if (action === "decrementar" && producto.cantidad === 1) {
        carrito = carrito.filter(p => p.id !== id)
    };
    guardarCarrito(carrito);
    renderizarCarrito(carrito);
}


//exporto carrito como una variable interna, se puede modificar solo con las funciones de carrito.js
// y se puede ver su contenido.
export { agregarAlCarrito, eliminarDelCarrito, calcularTotal, vaciarCarrito, actualizarCantidad, carrito  };