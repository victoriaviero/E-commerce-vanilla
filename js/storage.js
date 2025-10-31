// Encargado de mover la info de la base de datos que use (local o firebase) y utilizarla en la pagina.
import {products as productosIniciales} from "./productos.js";

//funcion para ver si hay algo guardado en el localstorage o traer los prod iniciales.
function leerProductos() {
    const productosGuardados = JSON.parse(localStorage.getItem("productos"));
    if (productosGuardados && productosGuardados.length > 0){
        return productosGuardados;
    }else {
    localStorage.setItem("productos", JSON.stringify(productosIniciales))
    return productosIniciales;
    }
};

//funcion para guardar productos agregados, actualiza stock.
function guardarProductos(listaProductos) {
    try{
        const productosString = JSON.stringify(listaProductos);
        localStorage.setItem("productos", productosString);
        console.log("Productos guardados correctamente")

    } catch(error){
            console.error("Error al guardar productos", error)
    }
}

//funcion para traer lo que el cliente tenia en carrito, guardado en su localstorage 
//o crear un array vacio, carrito desde 0, si no tenia nada.
function leerCarrito(){
    const carritoGuardado = localStorage.getItem("carrito")

    if(carritoGuardado){
        try{
            const data = JSON.parse(carritoGuardado);

            if (!Array.isArray(data)) {
                return Object.values(data);
            }
            return data;
            
        }catch(error){
            console.error("Error al leer el carrito", error);
            return [];
        }
    } else {
        localStorage.setItem("carrito", JSON.stringify([]));
        return [];
    }
}

//funcion para guardar y o actualizar el carrito, segun lo que haga el cliente.
function guardarCarrito(carrito) {
    try {
        const carritoString = JSON.stringify(carrito);
        localStorage.setItem("carrito", carritoString);
        console.log("carrito guardado correctamente");
    } catch(error){
        console.error("Error al guardar el carrito", error)
    }
}


export { leerProductos, guardarProductos, leerCarrito, guardarCarrito };

