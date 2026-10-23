import { Pedido } from "./pedido";
import { PedidoEnvio } from "./pedidoEnvio";
import { PedidoRetirar } from "./pedidoRetirar";
import { PedidoSalon } from "./pedidoSalon";
import { EstadoPedido } from "../estadoPedido";
import { Cocina } from "../cocina/cocina";
import { ItemIndividual } from "../itemIndividual";
import { Combo } from "../combo";
import { ZERO } from "../Constantes/constantes";

export class GestorPedidos {
    private pedidosTotales: Map<number, Pedido>;
    private cantidadPedidos : number = ZERO;
    private pedidosFinalizados: Map<number, Pedido>;

    constructor() {
        this.pedidosTotales = new Map();
        this.pedidosFinalizados = new Map();
    }


    public crearPedidoSalon(mesa : number): void {
        const pedido = new PedidoSalon(mesa);
        this.registrarPedido(pedido)
    }

    public crearPedidoRetirar(horario : number): Pedido {
        const pedido = new PedidoRetirar(horario);
        this.registrarPedido(pedido)
        return pedido
    }

    public crearPedidoEnvio(direccion : string): Pedido {
        const pedido = new PedidoEnvio(direccion);
        this.registrarPedido(pedido)
        return pedido
    }

    private registrarPedido(pedido: Pedido): void {
        pedido.setID(this.cantidadPedidos)
        this.pedidosTotales.set(pedido.getID(), pedido)
        this.cantidadPedidos++;
    }

    public getPedidoPorId(id: number): Pedido | undefined {
        return this.pedidosTotales.get(id);
    }

    //Confirmar pedido y distribuir sus items a las cocinas
    public confirmarPedido() :void {
        //falta implementacion
    }

    public distribuirItemsACocina() : void {
        //falta implementacion
    }

    public registrarPedidoFinalizado(idPedido: number): void {
        const pedido = this.pedidosTotales.get(idPedido);
        if (!pedido) {
            throw new Error(`Pedido ID ${idPedido} no encontrado.`);
        }
        if (pedido.getEstado() !== EstadoPedido.FACTURADO) {
            throw new Error(`El pedido ID ${idPedido} no se puede registrar como finalizado porque aún no fue facturado.`);
        }
        this.pedidosFinalizados.set(idPedido, pedido);
    }

    public consultarHistorial(): void {
        if (this.pedidosFinalizados.size === ZERO) {
            throw new Error("El historial de pedidos finalizados está vacío.");
        }
        this.pedidosFinalizados.forEach((pedido, id) => {
            console.log(`Pedido ID: ${id} Estado: ${pedido.getEstado()} Total Cobrado: $${pedido.getPrecioFinal()}`);
        });
    }

    public getPedidosFinalizados(): Map<number, Pedido> {
        return this.pedidosFinalizados;
    }
}