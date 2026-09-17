"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemPedido = void 0;
class ItemPedido {
    nombre;
    precio;
    estado;
    categoria;
    cantidad;
    constructor(estado, categoria) {
        this.nombre = "";
        this.precio = 0;
        this.cantidad = 0;
        this.estado = estado;
        this.categoria = categoria;
    }
    setNombre(nombre) {
        this.nombre = nombre;
    }
    setPrecio(precio) {
        this.precio = precio;
    }
    setCantidad(cantidad) {
        this.cantidad = cantidad;
    }
    setEstado(estado) {
        this.estado = estado;
    }
    setCategoria(categoria) {
        this.categoria = categoria;
    }
    getNombre() {
        return this.nombre;
    }
    getPrecio() {
        return this.precio;
    }
    getCantidad() {
        return this.cantidad;
    }
    getEstado() {
        return this.estado;
    }
    getCategoria() {
        return this.categoria;
    }
}
exports.ItemPedido = ItemPedido;
//# sourceMappingURL=itemPedido.js.map