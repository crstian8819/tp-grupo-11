import {EstadoItem} from "../estadoItem";
import {EstadoPedido} from "../estadoPedido";
import {List} from "../estructuraDatos/listaEnlazada";
import { ZERO } from "../Constantes/constantes";
import { ItemPedido } from "../itemPedido";
export abstract class Pedido {
    private items: List<ItemPedido>;
    private estado: EstadoPedido;
    private precioFinal: number;
    private id : number;
    private historialModificaciones: ItemPedido[]; // Pila para deshacer ultima modificacion

    constructor() {
        this.id = undefined as unknown as number;
        this.items = new List<ItemPedido>();
        this.precioFinal = ZERO;
        this.estado = EstadoPedido.EN_CONSTRUCCION;
        this.historialModificaciones = [];
    }

    public puedeModificarse () : boolean {
        return this.estado === EstadoPedido.EN_CONSTRUCCION;
    }

    public agregarItem(item: ItemPedido): void {
        if (!this.puedeModificarse()) {
            throw new Error("No se pueden agregar ítems a un pedido confirmado o facturado.");
        }
        this.items.push(item);
        this.historialModificaciones.push(item);
        this.calcularPrecioFinal();
    }

    public eliminarItem(item: ItemPedido): void {
        if (!this.puedeModificarse()) {
            throw new Error("No se pueden eliminar items de un pedido que no este en construcción.");
        }
        if (!item.puedeModificarse()) {
            throw new Error("No se puede eliminar un item en preparacion.");
        }

        this.items.delete(item);
        this.calcularPrecioFinal();
    }

    //metodo para deshacer ultima modificacion
    public deshacerUltimaModificacion(): void {
        if (!this.puedeModificarse()) {
            throw new Error("No se pueden deshacer cambios en un pedido ya confirmado.");
        }
        const ultimoItem = this.historialModificaciones.pop();
        if (ultimoItem) {
            this.items.delete(ultimoItem);
            this.calcularPrecioFinal();
        }
    }

    public calcularPrecioFinal(): number {
        let total = ZERO;
        let headAux = this.items.getHead();
        while (headAux) {
            total += headAux.getValue().getTotal();
            headAux = headAux.getNext();
        }
        total += this.getCargosAdicionales();
        this.precioFinal = total;
        return this.precioFinal;
    }

    // Metodo para sumar cargos adicionales según modalidad (ej. costoEnvio)
    public getCargosAdicionales(): number {
        return ZERO;
    }

    
    public setEstado(ESTADO: EstadoPedido) : void {
        this.estado = ESTADO
    }

    public getEstado() : EstadoPedido {
        return this.estado;
    }

    public setID(id : number) : void {
        this.id = id;
    }

    public getID() : number {
        return this.id;
    }

    public getItems(): List<ItemPedido> {
        return this.items;
    }

    public listItems(): void {
        let headAux = this.items.getHead();
        while(headAux) {
            console.log(`Item: ${headAux.getValue().getProducto().getNombre()}
            \nPrecio: ${headAux.getValue().getProducto()}`);
            headAux = headAux.getNext();
        }
    }
    
    public getPrecioFinal() : number {
        return this.calcularPrecioFinal();
    }

    

    public puedeFacturar() : boolean {
        return this.estado === EstadoPedido.CONFIRMADO;
    }

    //Impide facturar hasta que el pedido este CONFIRMADO y todos los items esten LISTO
    public listoParaFacturar(): boolean {
        let resultado = true
        if (this.estado !== EstadoPedido.CONFIRMADO) {
            resultado = false;
        }
        let headAux = this.items.getHead();
        if (!headAux) {
            resultado = false; //Un pedido vacio no se factura
        }
        while (headAux) {
            if (headAux.getValue().getEstado() !== EstadoItem.LISTO) {
                resultado = false;
            }
            headAux = headAux.getNext();
        }
        return resultado;
    }

}