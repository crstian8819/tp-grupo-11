import { Pedido } from "./pedido";
import { PedidoEnvio } from "./pedidoEnvio";
import { PedidoRetirar } from "./pedidoRetirar";
import { PedidoSalon } from "./pedidoSalon";
import { EstadoPedido } from "../estadoPedido";
import { Cocina } from "../cocina/cocina";
import { ItemIndividual } from "../itemIndividual";
import { Combo } from "../combo";
import { ZERO } from "../Constantes/constantes";
import { Factura } from "../GestorPagos/factura";
export class GestorPedidos {
    private pedidosTotales: Map<number, Pedido>;
    private cantidadPedidos : number = ZERO;
    private pedidosFinalizados: Map<number, Factura>;

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

    public registrarPedidoFinalizado(factura: Factura): void {
        const idFactura: number = this.getCantidadPedidosFinalizados();
        factura.setIdFactura(idFactura);
        this.pedidosFinalizados.set(idFactura, factura);
    }

    private getCantidadPedidosFinalizados(): number {
        return this.pedidosFinalizados.size
    }

    public consultarHistorial(): void {
        if (this.pedidosFinalizados.size === ZERO) {
            throw new Error("El historial de pedidos finalizados está vacío.");
        }
        this.pedidosFinalizados.forEach((factura, id) => {
            console.log(factura.getInfoPedido());
        });
    }

    public getPedidosFinalizados(): Map<number, Factura> {
        return this.pedidosFinalizados;
    }
}