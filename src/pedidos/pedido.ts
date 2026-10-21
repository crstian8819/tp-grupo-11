//import {ItemIndividual} from "../itemIndividual";
//import {EstadoItem} from "../estadoItem";
import {EstadoPedido} from "../estadoPedido";
import {List} from "../estructuraDatos/listaEnlazada";
import { ZERO } from "../Constantes/constantes";
import { Item } from "../item";
//import { ItemPedido } from "../itemPedido";
export abstract class Pedido {
    private items: List<Item>;
    private estado: EstadoPedido;
    private precioFinal: number;

    constructor() {
        // this.idPedido = this.items.length; Pasarlo como coleccion(cantidad) en el gestor de Pedidos
        this.items = new List<Item>();
        this.precioFinal = ZERO;
        this.estado = EstadoPedido.EN_CONSTRUCCION;
    }

    public puedeModificarse () : boolean {
        return this.estado === EstadoPedido.EN_CONSTRUCCION;
    }

    public agregarItem(item: Item) : void {
        if (this.puedeModificarse()) {
            this.items.push(item);
        }
    }

    public eliminarItem(value : Item) : void {
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
            this.precioFinal += headAux.getValue().getPrecio();
            headAux = headAux.getNext();
        }

    }

    public listItems(): void {
        let headAux = this.items.getHead();
        while(headAux) {
            console.log(`Item: ${headAux.getValue().getNombre()}
            \nPrecio: ${headAux.getValue().getPrecio()}`);
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

