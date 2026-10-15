import {ItemIndividual} from "../itemIndividual";
import {estadoPedido as EstadoPedido} from "../estadoPedido";

export abstract class Pedido {
    // private idPedido: number; //Pienso que el id deberia manejarlo el gestor, o el historial al manejarlo con map
    private items: Array<ItemIndividual>;
    private estado: EstadoPedido;
    private precioFinal: number;

    constructor(){
        // this.idPedido = this.items.length;
        this.items = [];
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

    public eliminarItem() : void {
        if (this.puedeModificarse()) {
            this.items.pop();
        }
    }

    
    public setEstado(ESTADO: EstadoPedido) : void {
        this.estado = ESTADO
    }
    
    public setPrecioFinal(): void {
        this.precioFinal = 0;

        for (const item of this.items) {
            this.precioFinal += item.getPrecio();
        }

    }
    
    public getPrecioFinal() : number {
        return this.precioFinal;
    }

    public puedeFacturar() : boolean {
        return this.estado === EstadoPedido.CONFIRMADO;
    }

}