import {Pedido} from "./pedido"
import {PedidoEnvio} from "./pedidoEnvio"
import {PedidoRetirar} from "./pedidoRetirar"
import {PedidoSalon} from "./pedidoSalon"

export class GestorPedidos {
    private pedidosTotales: Map<number, Pedido>;
    private pedidosFinalizados: Map<number, Pedido>;

    constructor(){
        this.pedidosTotales = new Map();
        this.pedidosFinalizados = new Map();
    }
}