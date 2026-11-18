import { Menu } from "./menu";
import { Cocina } from "./cocina/cocina";
import { GestorPedidos } from "./pedidos/gestorPedidos";
import { GestorPagos } from "./GestorPagos/gestorPagos";
import { DistribuirItem } from "./cocina/distribuirItem";
import { Pedido } from "./pedidos/pedido";
import { Factura } from "./GestorPagos/factura";
import { MedioPago } from "./GestorPagos/medioPago";
import { DescuentoDia } from "./GestorPagos/descuentoDia";
import { ErrorEnCocina } from "./Errores/errorEnCocina";
import { CERO, UNIDAD } from "./Constantes/constantes";
/**
 * Clase princpial del sistema (Patrón Facade)
 * Agrupa y coordina los subsistemas: Menú, Cocinas, GestorPedidos y GestorPagos.
 */
export class Restaurante {
    private menu: Menu;
    private cocinas: Cocina[];
    private gestorPedidos: GestorPedidos;
    private gestorPagos: GestorPagos;
    private distribuidor: DistribuirItem | undefined;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     */
    public constructor() {
        this.menu = new Menu();
        this.cocinas = [];
        this.gestorPedidos = new GestorPedidos();
        this.gestorPagos = new GestorPagos(this.gestorPedidos);
        this.distribuidor = undefined;
    }

    /**
     * Devuelve el menu administrado por el restaurante.
     * @returns {Menu} Resultado de la operacion.
     */
    public getMenu(): Menu {
        return this.menu;
    }

    /**
     * Devuelve el gestor de pedidos del restaurante.
     * @returns {GestorPedidos} Resultado de la operacion.
     */
    public getGestorPedidos(): GestorPedidos {
        return this.gestorPedidos;
    }

    /**
     * Devuelve el gestor de pagos del restaurante.
     * @returns {GestorPagos} Resultado de la operacion.
     */
    public getGestorPagos(): GestorPagos {
        return this.gestorPagos;
    }

    /**
     * Devuelve una copia de las cocinas registradas.
     * @returns {Cocina[]} Resultado de la operacion.
     */
    public getCocinas(): Cocina[] {
        return [...this.cocinas];
    }

    /**
     * Registra una estación de cocina en el sistema y la encadena
     * automáticamente según el patrón Chain of Responsability.
     */
    public agregarCocina(cocina: Cocina): void {
        if (this.cocinas.length > CERO) {
            const ultimaCocina = this.cocinas[this.cocinas.length - UNIDAD];
            ultimaCocina.setSiguiente(cocina);
        } else {
            this.distribuidor = new DistribuirItem(cocina);
        }
        this.cocinas.push(cocina);
    }

    /**
     * Configura el descuento correspondiente a un dia de la semana.
     * @param {DescuentoDia} descuento - Factor de descuento.
     */
    public configurarDescuentoDelDia(descuento: DescuentoDia): void {
        this.gestorPagos.setDescuentoDelDia(descuento);
    }

    /**
     * Configura el factor de descuento para pagos en efectivo.
     * @param {number} descuento - Factor de descuento.
     */
    public configurarDescuentoEnEfectivo(descuento: number): void {
        this.gestorPagos.setDescuentoEnEfectivo(descuento);
    }

    /**
     * Crea y devuelve un pedido asociado a una mesa.
     * @param {number} mesa - Numero de mesa.
     * @returns {Pedido} Resultado de la operacion.
     */
    public abrirPedidoSalon(mesa: number): Pedido {
        return this.gestorPedidos.crearPedidoSalon(mesa);
    }

    /**
     * Crea y devuelve un pedido para retirar en un horario.
     * @param {number} horario - Horario de retiro.
     * @returns {Pedido} Resultado de la operacion.
     */
    public abrirPedidoRetirar(horario: number): Pedido {
        return this.gestorPedidos.crearPedidoRetirar(horario);
    }

    /**
     * Crea y devuelve un pedido para enviar a una direccion.
     * @param {string} direccion - Direccion de envio.
     * @returns {Pedido} Resultado de la operacion.
     */
    public abrirPedidoEnvio(direccion: string): Pedido {
        return this.gestorPedidos.crearPedidoEnvio(direccion);
    }

    /**
     * Busca un pedido por su ID y lo confirma, enviando sus ítems
     * a las cocinas correspondientes mediante el distribuidor.
     */
    public confirmarPedido(idPedido: number): void {
        const pedido = this.gestorPedidos.getPedidoPorId(idPedido);
        
        if (!pedido) {
            throw new Error(`El pedido con ID ${idPedido} no existe.`);
        }

        if (!this.distribuidor) {
            throw new ErrorEnCocina("No hay cocinas registradas en el sistema para distribuir ítems.");
        }

        this.gestorPedidos.confirmarPedido(pedido, this.distribuidor);
    }

    /**
     * Asigna el medio de pago, valida que el pedido esté listo y lo cobra.
     */
    public cobrarPedido(idPedido: number, medioPago: MedioPago): Factura {
        const pedido = this.gestorPedidos.getPedidoPorId(idPedido);

        if (!pedido) {
            throw new Error(`El pedido con ID ${idPedido} no existe.`);
        }

        this.gestorPagos.setMedioPago(medioPago);
        const factura = this.gestorPagos.cobrar(pedido);

        if (!factura) {
            throw new Error("Ocurrió un error inesperado al emitir la factura.");
        }
        
        return factura;
    }

    /**
     * Devuelve las facturas registradas en el historial de ventas.
     * @returns {Factura[]} Resultado de la operacion.
     */
    public consultarHistorialVentas(): Factura[] {
        return this.gestorPedidos.consultarHistorial();
    }
}
