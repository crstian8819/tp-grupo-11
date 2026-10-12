import {ItemIndividual} from "./itemIndividual";
import {estadoPedido as EstadoPedido} from "./estadoPedido";
import {Producto} from "./producto"

export abstract class Pedido implements Producto {
    private idPedido: number; //Pienso que el id deberia manejarlo el gestor, o el historial al manejarlo con map
    private items: Array<ItemIndividual>;
    private estado: EstadoPedido;
    private precio: number;
    // private medioPago: medioPago; NO DEBE SER PARTE DE PEDIDO

    constructor(idPedido:number){
        this.estado = EstadoPedido.EN_CONSTRUCION;
        this.idPedido = idPedido;
        this.items = [];
        this.precio = 0;
    }

    public puedeModificarse () : boolean {
        return this.estado === EstadoPedido.EN_CONSTRUCION;
    }

    public agregarItem(item: ItemIndividual) : void {
        this.items.push(item);
    }

    public eliminarItem() : void {
        this.items.pop()
    }

    public getPrecio(): number {
        let precio = 0;

        for (const item of this.items) {
            precio += item.getPrecio();
        }

        return precio
    }

    public setEstado(ESTADO: EstadoPedido) : void {
        this.estado = ESTADO
    }

}