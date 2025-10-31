//la interfaz o UI crea lo que se ve en la pagina, sin pasarle los parametros, se los pasa Main al renderizar

//TARJETAS CARDS
//crea la tarjeta visual de productos para el cliente 
function crearCard(producto) {
    const div = document.createElement("div");
    div.classList.add("producto");
    div.innerHTML = `
        <img class="img-producto" src="${producto.imagen}" alt="${producto.nombre}">
        <div class="info-card">
            <h3 class="titulo-card">${producto.nombre}</h3>
            <p class="precio-card">${producto.precio}</p>
            <button class="btn-card" data-id="${producto.id}">Agregar</button>
    </div>
    `
    return div;
}

//recorre el storage de productos y crea una card por producto disponible
function renderizarProductosCard(lista,contenedor){
    contenedor.innerHTML = "";
    lista.forEach(producto =>{
        const card = crearCard(producto);
        contenedor.append(card);
    });
}

//CARRITO CART
//crea la parte visual del carrito
function renderizarCarrito(carrito) {
    const contenedorCarrito = document.getElementById("cart-items")
    const totalCarrito = document.getElementById("total-cart")

//limpio el carrito
    contenedorCarrito.innerHTML = "";

//si esta vacio
    if (carrito.length === 0) {
        contenedorCarrito.innerHTML = "<li> Tu carrito esta vacio, compra algo lindo! :3 </li>";
        totalCarrito.textContent = 0;
        return;
    }

//si el carrito tiene cosas recorre el array, muestra y suma totales
//data-id es para saber el producto elegido solo con su id, evita usar .map o .find para saber donde
//ocurrio el evento, localiza el item mas facil.
    let total = 0;
    carrito.forEach(producto => {
        const item = document.createElement("li");
        item.classList.add("item-carrito");

        item.innerHTML = `
        <span>${producto.nombre}</span>
      <div class="controles-cantidad">
        <button class="btn-cantidad" data-id="${producto.id}" data-action="decrementar">➖</button>
        <span class="cantidad">${producto.cantidad}</span>
        <button class="btn-cantidad" data-id="${producto.id}" data-action="incrementar">➕</button>
      </div>
      <span>$${producto.precio * producto.cantidad}</span>
      <button class="btn-eliminar" data-id="${producto.id}">❌</button>
        `
        contenedorCarrito.appendChild(item);
        total += producto.precio * producto.cantidad;
    })

    totalCarrito.textContent = total;
    
    
}



export {crearCard, renderizarProductosCard, renderizarCarrito};
