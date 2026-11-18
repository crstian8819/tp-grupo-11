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

/**
 * Crea, registra, confirma y consulta los pedidos y las facturas finalizadas.
 */
export class GestorPedidos {
    private pedidosTotales: Map<number, Pedido>;
    private cantidadPedidos : number = CERO;
    private pedidosFinalizados: Map<number, Factura>;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     */
    public constructor() {
        this.pedidosTotales = new Map();
        this.pedidosFinalizados = new Map();
    }


    /**
     * Crea y registra un pedido de salon.
     * @param {number} mesa - Numero de mesa.
     * @returns {Pedido} Resultado de la operacion.
     */
    public crearPedidoSalon(mesa : number): Pedido {
        const pedido = new PedidoSalon(mesa);
        this.registrarPedido(pedido);
        return pedido;
    }

    /**
     * Crea y registra un pedido para retirar.
     * @param {number} horario - Horario de retiro.
     * @returns {Pedido} Resultado de la operacion.
     */
    public crearPedidoRetirar(horario : number): Pedido {
        const pedido = new PedidoRetirar(horario);
        this.registrarPedido(pedido)
        return pedido
    }

    /**
     * Crea y registra un pedido de envio.
     * @param {string} direccion - Direccion de envio.
     * @returns {Pedido} Resultado de la operacion.
     */
    public crearPedidoEnvio(direccion : string): Pedido {
        const pedido = new PedidoEnvio(direccion);
        this.registrarPedido(pedido)
        return pedido
    }

    /**
     * Realiza la operacion registrarPedido dentro del sistema.
     * @param {Pedido} pedido - Pedido sobre el que se realiza la operacion.
     */
    private registrarPedido(pedido: Pedido): void {
        pedido.setID(this.cantidadPedidos)
        this.pedidosTotales.set(pedido.getID(), pedido)
        this.cantidadPedidos++;
    }

    /**
     * Busca y devuelve un pedido por su identificador.
     * @param {number} identificador - Identificador del elemento.
     * @returns {Pedido | undefined} Resultado de la operacion.
     */
    public getPedidoPorId(identificador: number): Pedido | undefined {
        return this.pedidosTotales.get(identificador);
    }

    //Confirmar pedido y distribuir sus items a las cocinas
    /**
     * Busca el pedido, valida que pueda confirmarse y distribuye sus items en las cocinas.
     * @param {Pedido} pedido - Pedido sobre el que se realiza la operacion.
     * @param {DistribuirItem} distribuidor - Componente encargado de distribuir los items.
     */
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

    /**
     * Envia los componentes de los items del pedido a las cocinas correspondientes.
     * @param {Pedido} pedido - Pedido sobre el que se realiza la operacion.
     * @param {DistribuirItem} distribuidor - Componente encargado de distribuir los items.
     */
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

    /**
     * Asigna un identificador y registra la factura en el historial.
     * @param {Factura} factura - Factura que se desea registrar.
     */
    public registrarPedidoFinalizado(factura: Factura): void {
        const idFactura: number = this.getCantidadPedidosFinalizados();
        factura.setIdFactura(idFactura);
        this.pedidosFinalizados.set(idFactura, factura);
    }

    /**
     * Realiza la operacion getCantidadPedidosFinalizados dentro del sistema.
     * @returns {number} Resultado de la operacion.
     */
    private getCantidadPedidosFinalizados(): number {
        return this.pedidosFinalizados.size
    }

    /**
     * Devuelve las facturas finalizadas o informa si el historial esta vacio.
     * @returns {Factura[]} Resultado de la operacion.
     */
    public consultarHistorial(): Factura[] {
        if (this.pedidosFinalizados.size === CERO) {
            throw new ErrorEnHistorial("El historial de pedidos finalizados está vacío.");
        }
        return Array.from(this.pedidosFinalizados.values());
    }

    /**
     * Devuelve el registro de pedidos finalizados.
     * @returns {Map<number, Factura>} Resultado de la operacion.
     */
    public getPedidosFinalizados(): Map<number, Factura> {
        return this.pedidosFinalizados;
    }
}
