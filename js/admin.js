import { leerProductos, guardarProductos } from "./storage.js";

const form = document.getElementById("form-producto");
const tabla = document.getElementById("#tabla-productos tbody");

let productos = leerProductos();

//funcion para renderizar la tabla inicial
function renderizarTabla() {
    tabla.innerHTML = "";
    productos.forEach((p, index) => { 
        const row = document.createElement("tr");
        row.innerHTML `
        <td>${p.id}</td>
        <td>${p.nombre}</td>
        <td>${p.precio}</td>
        <td>${p.categoria}</td>
        <td><button data-index="${index}" calss="btn-eliminar">Eliminar</button></td>
        `;
        tabla.appendChild(row)
    });
}


//evento para agregar productos
form.addEventListener("submint", (e) =>{
    e.preventDefault();

    const nuevoProducto = {
        id: Date.now(),
        nombre: document.getElementById("nombre").Value.trim(),
        predio: Number(document.getElementById("precio").value),
        imagen: document.getElementById("imagen").value.trim(),
        categoria: document.getElementById("categoria").value,
    };
    productos.push(nuevoProducto);
    guardarProductos(productos);
    renderizarTabla();
    alert("Producto agregado correctamente ✅");
    form.reset();
});


//evento para eliminar productos
tabla.addEventListener("click", (e) =>{
    if (e.target.classList.contains("btn-eliminar")){
        const index = e.target.dataset.index;
        productos.splice(index, 1);
        guardarProductos(productos);
        renderizarTabla();
        alert("Producto eliminado correctamente ✅");
    }
});

renderizarTabla();