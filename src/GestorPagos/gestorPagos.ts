import { MedioPago } from "./medioPago";
import { TipoMedioPago } from "./tipoMedioPago";
import { DescuentoDia } from "./descuentoDia";
import { Factura } from "./factura";
import { Pedido } from "../pedidos/pedido"; 
import { DescuentoBeneficioso } from "./descuento";
import { EstadoPedido } from "../estadoPedido"
import { ErrorDeFacturacion } from "../Errores/errorDeFacturacion";
import { TEN_PERCENT } from "../Constantes/constantes";
import { ONE_ } from "../Constantes/constantes";


export class GestorPagos implements DescuentoBeneficioso {
    private medioPago: MedioPago | undefined;
    private descuentoDelDia: DescuentoDia | undefined;
    private descuentoEnEfectivo: number;

    public constructor(descuentoDia?:DescuentoDia) {
        this.medioPago = undefined;
        this.descuentoDelDia = descuentoDia ?? undefined;
        this.descuentoEnEfectivo = TEN_PERCENT; //0.9
    }

    public setMedioPago(medioPago:MedioPago): void {
        this.medioPago=medioPago;
    }

    public cobrar(pedido: Pedido): Factura | undefined {
        if (pedido.puedeFacturar()) {
            if (this.medioPago) {
                const monto:number = pedido.getPrecioFinal()*this.calcularDescuento();
                if (this.medioPago.pagar(monto)) {
                    pedido.setEstado(EstadoPedido.FACTURADO);
                    const factura = new Factura(pedido, monto);

                    return factura
                } else {
                    throw new ErrorDeFacturacion("Saldo insuficiente.");
                }
            } else {
                throw new ErrorDeFacturacion("No hay medio de pago.")
            }
        } else {
            throw new ErrorDeFacturacion("El pedido no se encuentra LISTO.");
        }
            
    }

    //COMPARA ENTRE LOS DESCUENTOS DISPONIBLES
    public calcularDescuento(): number {
        let mayorBeneficio:number = ONE_;

        if (this.medioPago?.getTipoDePago() === TipoMedioPago.EFECTIVO) {
            mayorBeneficio = Math.min(mayorBeneficio, this.descuentoEnEfectivo);
        }
        if (this.descuentoDelDia !== undefined) {
            mayorBeneficio = Math.min(mayorBeneficio, this.descuentoDelDia.getPorcentajeDescuento());
        }

        return mayorBeneficio
    }

}