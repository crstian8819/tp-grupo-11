import { MedioPago } from "./medioPago";
import { TipoMedioPago } from "./tipoMedioPago";
import { DescuentoDia } from "./descuentoDia";
import { Factura } from "./factura";
import { Pedido } from "../pedidos/pedido"; 
import { DescuentoBeneficioso } from "./descuento";
import { EstadoPedido } from "../estadoPedido"
import { ErrorEnFacturacion } from "../Errores/errorEnFacturacion";
import { UNIDAD } from "../Constantes/constantes";
import { GestorPedidos } from "../pedidos/gestorPedidos";

/**
 * Administra los medios de pago, calcula descuentos y genera las facturas.
 */
export class GestorPagos implements DescuentoBeneficioso {
    private medioPago: MedioPago | undefined;
    private descuentoDelDia: DescuentoDia | undefined;
    private descuentoEnEfectivo: number;
    private gestorPedidos: GestorPedidos;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {GestorPedidos} gestorPedidos - Dato necesario para inicializar el objeto.
     */
    public constructor(gestorPedidos:GestorPedidos) {
        this.medioPago = undefined;
        this.descuentoDelDia = undefined;
        this.descuentoEnEfectivo = UNIDAD;
        this.gestorPedidos = gestorPedidos;
    }

    /**
     * Establece el medio de pago que se utilizara al cobrar.
     * @param {MedioPago} medioPago - Medio de pago seleccionado.
     */
    public setMedioPago(medioPago:MedioPago): void {
        this.medioPago=medioPago;
    }

    /**
     * @param {number} descuento - Se aplica directamente en la multiplicación:
     * Por default: 1 = 0%; 
     * 0.9 = 10%;
     * 0.8 = 20%;
     * 0.7 = 30%;
     * ...
     */
    public setDescuentoDelDia(descuento: DescuentoDia): void {
        this.descuentoDelDia = descuento;
    }

    /**
     * Devuelve el descuento configurado para un dia, si existe.
     * @returns {DescuentoDia | undefined} Resultado de la operacion.
     */
    public getDescuentoDelDia(): DescuentoDia | undefined {
        return this.descuentoDelDia
    }

    /**
     * @param {number} descuento - Se aplica directamente en la multiplicación:
     * Por default: 1 = 0%; 
     * 0.9 = 10%;
     * 0.8 = 20%;
     * 0.7 = 30%;
     * ...
     */
    public setDescuentoEnEfectivo(descuento: number): void {
        this.descuentoEnEfectivo = descuento;
    }

    /**
     * Devuelve el factor de descuento para pagos en efectivo.
     * @returns {number} Resultado de la operacion.
     */
    public getDescuentoEnEfectivo(): number {
        return this.descuentoEnEfectivo
    }

    /**
     * Valida que el pedido este listo, calcula el monto y registra la factura.
     * @param {Pedido} pedido - Pedido sobre el que se realiza la operacion.
     * @returns {Factura | undefined} Resultado de la operacion.
     */
    public cobrar(pedido: Pedido): Factura | undefined {
        if (pedido.listoParaFacturar()) {
            if (this.medioPago) {
                const monto:number = pedido.getPrecioFinal()*this.calcularDescuento(pedido);
                //if (this.medioPago.pagar(monto)) {
                    pedido.setEstado(EstadoPedido.FACTURADO);
                    const factura = new Factura(pedido, monto);
                    this.gestorPedidos.registrarPedidoFinalizado(factura);
                    return factura
                //} else {
                  //  throw new ErrorEnFacturacion("Saldo insuficiente.");
                //}
            } else {
                throw new ErrorEnFacturacion("No hay medio de pago.");
            }
        } else {
            throw new ErrorEnFacturacion("El pedido no se encuentra LISTO PARA FACTURAR.");
        }
    }

    /**
     * Calcula el factor de descuento mas beneficioso aplicable al pedido.
     * @param {Pedido} pedido - Pedido sobre el que se realiza la operacion.
     * @returns {number} Resultado de la operacion.
     */
    public calcularDescuento(pedido: Pedido): number {
        let mayorBeneficio:number = UNIDAD;

        if (this.medioPago?.getTipoDePago() === TipoMedioPago.EFECTIVO) {
            mayorBeneficio = Math.min(mayorBeneficio, this.descuentoEnEfectivo);
        }
        if (this.descuentoDelDia !== undefined) {
            const diaPedido = pedido.getFecha().getDay();
            if (diaPedido === this.descuentoDelDia.getDiaDeLaSemana()) {
                mayorBeneficio = Math.min(mayorBeneficio, this.descuentoDelDia.getPorcentajeDescuento());
            }
        }
        return mayorBeneficio
    }
}
