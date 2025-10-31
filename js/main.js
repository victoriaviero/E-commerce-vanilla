import { products } from "./productos.js"
import { renderizarProductosCard , renderizarCarrito} from "./interfaz.js"
import { leerCarrito } from "./storage.js";
import { agregarAlCarrito, eliminarDelCarrito, actualizarCantidad } from "./cartcarrito.js";



const contenedorProductos = document.querySelector("#products-container")
const contenedorCarrito = document.querySelector("#cart-items")
const btnMujer = document.querySelector("link-mujeres")
const btnNinos = document.querySelector("link-niños")
const btnTodos = document.querySelector("link-todos")

let carrito = leerCarrito() || [];

function iniciarApp() {
  renderizarProductosCard(products, contenedorProductos);
  renderizarCarrito(carrito);
  activarEventos();
}

function activarEventos() {
  contenedorProductos.addEventListener("click",(e) => {
  if (e.target.classList.contains("btn-card")){
    const idProducto = Number(e.target.dataset.id);
    const productoSeleccionado = products.find(p => p.id === idProducto);
    if (productoSeleccionado){
      agregarAlCarrito(productoSeleccionado)
    }
  }
});
}

//eventos links mujeres, niños y todos
document.addEventListener("click", (e) => {
  if (e.target.classList.contains(".link-mujeres")){
    e.preventDefault();
    const productosMujer = products.filter(p => p.categoria === "mujeres")
    renderizarProductosCard(productosMujer, contenedorProductos);
  }
  if (e.target.classList.contains(".link-niños")){
    e.preventDefault();
    const productosNinos = products.filter(p => p.categoria === "niños")
    renderizarProductosCard(productosNinos, contenedorProductos);
    if (e.target.classList.contains(".link-todos")) {
      e.preventDefault();
      renderizarProductosCard(products, contenedorProductos);
    }
  }
})


//eventos dentro del carrito por delegacion de eventos dataset
contenedorCarrito.addEventListener("click", (e) => {
    const idProducto = Number(e.target.dataset.id);

    if (e.target.classList.contains("btn-eliminar")) {
      eliminarDelCarrito(idProducto);
    }

    if (e.target.classList.contains("btn-cantidad")) {
      const action = e.target.dataset.action;
      actualizarCantidad(idProducto, action);
    }
  });



iniciarApp();


