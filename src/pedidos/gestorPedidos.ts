import { Pedido } from "./pedido";
import { PedidoEnvio } from "./pedidoEnvio";
import { PedidoRetirar } from "./pedidoRetirar";
import { PedidoSalon } from "./pedidoSalon";
import { CERO } from "../Constantes/constantes";
import { Factura } from "../GestorPagos/factura";
import { EstadoPedido } from "../estadoPedido";
import { DistribuirItem } from "../cocina/distribuirItem";
import { ItemPedido } from "../itemPedido";
import { ErrorEnConfirmacion } from "../Errores/errorEnConfirmacion";
import { ErrorEnDistribucion } from "../Errores/errorEnDistribucion";
import { ErrorEnHistorial } from "../Errores/errorEnHistorial";

export class GestorPedidos {
    private pedidosTotales: Map<number, Pedido>;
    private cantidadPedidos : number = CERO;
    private pedidosFinalizados: Map<number, Factura>;

    public constructor() {
        this.pedidosTotales = new Map();
        this.pedidosFinalizados = new Map();
    }


    public crearPedidoSalon(mesa : number): Pedido {
        const pedido = new PedidoSalon(mesa);
        this.registrarPedido(pedido);
        return pedido;
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

    public getPedidoPorId(identificador: number): Pedido | undefined {
        return this.pedidosTotales.get(identificador);
    }

    //Confirmar pedido y distribuir sus items a las cocinas
    public confirmarPedido(pedido: Pedido, distribuidor: DistribuirItem): void {
        if (pedido.getEstado() !== EstadoPedido.EN_CONSTRUCCION) {
            throw new Error("Solo se pueden confirmar pedidos en construcción.");
        }

        const primerItem = pedido.getItems().getHead();

        if (!primerItem) {
            throw new ErrorEnConfirmacion("No se puede confirmar un pedido vacío.");
        }

        this.distribuirItemsACocina(pedido, distribuidor);
        pedido.setEstado(EstadoPedido.CONFIRMADO);
    }

    public distribuirItemsACocina(pedido: Pedido, distribuidor: DistribuirItem): void {
        if (this.pedidosTotales.get(pedido.getID()) !== pedido) {
            throw new ErrorEnDistribucion("El pedido no está registrado en este gestor.");
        }
        
        const lineas: ItemPedido[] = [];
        let node = pedido.getItems().getHead();

        while (node) {
            lineas.push(node.getValue());
            node = node.getNext();
        }

        distribuidor.distribuir(lineas);
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
        if (this.pedidosFinalizados.size === CERO) {
            throw new ErrorEnHistorial("El historial de pedidos finalizados está vacío.");
        }
        this.pedidosFinalizados.forEach((factura) => {
            console.log(factura.getInfoPedido());
        });
    }

    public getPedidosFinalizados(): Map<number, Factura> {
        return this.pedidosFinalizados;
    }
}