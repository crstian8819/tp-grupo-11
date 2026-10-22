//import {ItemIndividual} from "../itemIndividual";
//import {EstadoItem} from "../estadoItem";
import {EstadoPedido} from "../estadoPedido";
import {List} from "../estructuraDatos/listaEnlazada";
import { ZERO } from "../Constantes/constantes";
import { ItemPedido } from "../itemPedido";
//import { ItemPedido } from "../itemPedido";
export abstract class Pedido {
    private items: List<ItemPedido>;
    private estado: EstadoPedido;
    private precioFinal: number;

    constructor() {
        // this.idPedido = this.items.length; Pasarlo como coleccion(cantidad) en el gestor de Pedidos
        this.items = new List<ItemPedido>();
        this.precioFinal = ZERO;
        this.estado = EstadoPedido.EN_CONSTRUCCION;
    }

    public puedeModificarse () : boolean {
        return this.estado === EstadoPedido.EN_CONSTRUCCION;
    }

    public agregarItem(item: ItemPedido) : void {
        if (this.puedeModificarse()) {
            this.items.push(item);
        }
    }

    public eliminarItem(value : ItemPedido) : void {
        if (this.puedeModificarse()) {
            this.items.delete(value);
        }
    }

    public setEstado(ESTADO: EstadoPedido) : void {
        this.estado = ESTADO
    }
    
    public setPrecioFinal(): void {
        this.precioFinal = ZERO;
        let headAux = this.items.getHead();
        while (headAux) {
            this.precioFinal += headAux.getValue().getItem().getPrecio();
            headAux = headAux.getNext();
        }

    }

    public listItems(): void {
        let headAux = this.items.getHead();
        while(headAux) {
            console.log(`Item: ${headAux.getValue().getItem().getNombre()}
            \nPrecio: ${headAux.getValue().getItem()}`);
            headAux = headAux.getNext();
        }
    }
    
    public getPrecioFinal() : number {
        return this.precioFinal;
    }

    public puedeFacturar() : boolean {
        return this.estado === EstadoPedido.CONFIRMADO;
    }

}

