import {ItemIndividual} from "../itemIndividual";
import {estadoPedido as EstadoPedido} from "../estadoPedido";
import {List} from "../estructuraDatos/listaEnlazada";

export abstract class Pedido {
    private items: List<ItemIndividual>;
    private estado: EstadoPedido;
    private precioFinal: number;

    constructor(){
        // this.idPedido = this.items.length; Pasarlo como coleccion(cantidad) en el gestor de Pedidos
        this.items = new List<ItemIndividual>();
        this.precioFinal = undefined as unknown as number;
        this.estado = EstadoPedido.EN_CONSTRUCION;
    }

    public puedeModificarse () : boolean {
        return this.estado === EstadoPedido.EN_CONSTRUCION;
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

    public setEstado(ESTADO: EstadoPedido) : void {
        this.estado = ESTADO
    }
    
    // public setPrecioFinal(): void {
    //     this.precioFinal = 0;

    //     for (const item of this.items) {
    //         this.precioFinal += item.getPrecio();
    //     }

    // }
    
    public getPrecioFinal() : number {
        return this.precioFinal;
    }

    public puedeFacturar() : boolean {
        return this.estado === EstadoPedido.CONFIRMADO;
    }


}

