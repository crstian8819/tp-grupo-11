import {ItemIndividual} from "../itemIndividual";
import {EstadoItem} from "../estadoItem";
import {List} from "../estructuraDatos/listaEnlazada";

export abstract class Pedido {
    private items: List<ItemIndividual>;
    private estado: EstadoItem;
    private precioFinal: number;

    constructor() {
        // this.idPedido = this.items.length; Pasarlo como coleccion(cantidad) en el gestor de Pedidos
        this.items = new List<ItemIndividual>();
        this.precioFinal = 0;
        this.estado = EstadoItem.EN_PREPARACION;
    }

    public puedeModificarse () : boolean {
        return this.estado === EstadoItem.EN_PREPARACION;
    }

    public agregarItem(item: ItemIndividual) : void {
        if (this.puedeModificarse()) {
            this.items.push(item);
        }
    }

    public eliminarItem(value : ItemIndividual) : void {
        if (this.puedeModificarse()) {
            this.items.delete(value);
        }
    }

    public setEstado(ESTADO: EstadoItem) : void {
        this.estado = ESTADO
    }
    
    public setPrecioFinal(): void {
        this.precioFinal = 0;
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
            \nCantidad: ${headAux.getValue().getCantidad()}`);
            headAux = headAux.getNext();
        }
    }
    
    public getPrecioFinal() : number {
        return this.precioFinal;
    }

    public puedeFacturar() : boolean {
        return this.estado === EstadoItem.LISTO;
    }


}

