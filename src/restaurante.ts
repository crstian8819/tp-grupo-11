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
import { UNIDAD } from "./Constantes/constantes";
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

    public constructor() {
        this.menu = new Menu();
        this.cocinas = [];
        this.gestorPedidos = new GestorPedidos();
        this.gestorPagos = new GestorPagos(this.gestorPedidos);
        this.distribuidor = undefined;
    }

    public getMenu(): Menu {
        return this.menu;
    }

    public getGestorPedidos(): GestorPedidos {
        return this.gestorPedidos;
    }

    public getGestorPagos(): GestorPagos {
        return this.gestorPagos;
    }

    public getCocinas(): Cocina[] {
        return [...this.cocinas];
    }

    /**
     * Registra una estación de cocina en el sistema y la encadena
     * automáticamente según el patrón Chain of Responsability.
     */
    public agregarCocina(cocina: Cocina): void {
        if (this.cocinas.length > 0) {
            const ultimaCocina = this.cocinas[this.cocinas.length - UNIDAD];
            ultimaCocina.setSiguiente(cocina);
        } else {
            this.distribuidor = new DistribuirItem(cocina);
        }
        this.cocinas.push(cocina);
    }

    public configurarDescuentoDelDia(descuento: DescuentoDia): void {
        this.gestorPagos.setDescuentoDelDia(descuento);
    }

    public configurarDescuentoEnEfectivo(descuento: number): void {
        this.gestorPagos.setDescuentoEnEfectivo(descuento);
    }

    public abrirPedidoSalon(mesa: number): Pedido {
        return this.gestorPedidos.crearPedidoSalon(mesa);
    }

    public abrirPedidoRetirar(horario: number): Pedido {
        return this.gestorPedidos.crearPedidoRetirar(horario);
    }

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

    public consultarHistorialVentas(): Factura[] {
        return this.gestorPedidos.consultarHistorial();
    }
}