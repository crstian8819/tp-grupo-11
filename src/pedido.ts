import {ItemIndividual} from "./itemIndividual";
import {estadoPedido} from "./estadoPedido";
import {Producto} from "./producto"

export abstract class Pedido implements Producto {
    private id_pedido: number; //Pienso que el id deberia manejarlo el gestor, o el historial al manejarlo con map
    private items: Array<ItemIndividual>;
    private estado: estadoPedido;
    private precio: number;
    // private medioPago: medioPago; NO DEBE SER PARTE DE PEDIDO

    constructor(id_pedido:number){
        this.estado = estadoPedido.EN_CONSTRUCION;
        this.id_pedido = id_pedido;
        this.items = [];
        this.precio = 0;
    }

    public puedeModificarse () : boolean {
        return this.estado === estadoPedido.EN_CONSTRUCION;
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

    public setEstado(ESTADO: estadoPedido) : void {
        this.estado = ESTADO
    }

}