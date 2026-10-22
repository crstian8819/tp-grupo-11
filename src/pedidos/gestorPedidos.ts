import {Pedido} from "./pedido"
import {PedidoEnvio} from "./pedidoEnvio"
import {PedidoRetirar} from "./pedidoRetirar"
import {PedidoSalon} from "./pedidoSalon"
import { ZERO } from "../Constantes/constantes";


export class GestorPedidos {
    private pedidosTotales: Map<number, Pedido>;
    private cantidadPedidos : number = ZERO;
    private pedidosFinalizados: Map<number, Pedido>;

    constructor() {
        this.pedidosTotales = new Map();
        this.pedidosFinalizados = new Map();
    }

    public consultarHistorial() {
        this.pedidosFinalizados.forEach((pedido, id) => {
            console.log(`Id: ${id} precio del pedido: ${pedido.getPrecioFinal()}`)
        });
    }

    //FALTA IMPLEMENTACION.
    public registrarPedidoFinalizado():void {
        
    }

    public crearPedidoSalon(mesa : number): void {
        const pedido = new PedidoSalon(mesa);
        this.registrarPedido(pedido)
    }

    public crearPedidoRetirar(horario : number): void {
        const pedido = new PedidoRetirar(horario);
        this.registrarPedido(pedido)

    }

    public crearPedidoEnvio(direccion : string): void {
        const pedido = new PedidoEnvio(direccion);
        this.registrarPedido(pedido)

    }

    private registrarPedido(pedido: Pedido): void {
        pedido.setID(this.cantidadPedidos)
        this.pedidosTotales.set(pedido.getId(), pedido)
        this.cantidadPedidos++;
    }
}