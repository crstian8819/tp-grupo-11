import { MedioPago } from "./medioPago";
import { TipoMedioPago } from "./tipoMedioPago";
import { DescuentoDia } from "./descuentoDia";
import { Factura } from "./factura";
import { Pedido } from "../pedidos/pedido"; 
import { Descuento } from "./descuento";
import { EstadoItem } from "../estadoItem"
//ANTES DE MERGEAR LAS RAMAS A DEVELOP
//->SEPARAR CARPETAS DE ERRORES Y CONSTANTES. MERGEAR ENTRE TODOS.
import { ErrorDeFacturacion } from "../Errores/errorDeFacturacion";
import { TEN_PERCENT } from "../Constantes/constantes";
import { ONE_ } from "../Constantes/constantes";


export class GestorPagos implements Descuento {
    private medioPago: MedioPago | undefined;
    private descuentoDelDia: DescuentoDia | undefined;
    private descuentoEnEfectivo: number;

    public constructor(descuentoDia?:DescuentoDia) {
        this.medioPago = undefined;
        this.descuentoDelDia = undefined;
        this.descuentoEnEfectivo = TEN_PERCENT; //0.9
    }

    public setMedioPago(medioPago:MedioPago): void {
        this.medioPago=medioPago;
    }

    public setDescuentoDelDia(diaDeLaSemana: string, porcentaje:number): void {
        this.descuentoDelDia?.setDiaDeLaSemana(diaDeLaSemana);
        this.descuentoDelDia?.setPorcentajeDescuento(porcentaje);
    }

    public calcularDescuento(pedido: Pedido): number {
        return pedido.getPrecioFinal()*this.descuentoEnEfectivo
    }

    public cobrar(pedido: Pedido): Factura {
        if (pedido.puedeFacturar()) {
            if (this.medioPago) {
                const monto:number = pedido.getPrecioFinal()*this.descuentoBeneficioso();
                if (this.medioPago.pagar(monto)) {
                    pedido.setEstado(EstadoPedido.FACTURADO);
                    const factura = new Factura(pedido, monto);

                } else {
                    throw new ErrorDeFacturacion("Saldo insuficiente.");
                }
            } else {
                throw new ErrorDeFacturacion("No hay medio de pago.")
            }
        } else {
            throw new ErrorDeFacturacion("El pedido no se encuentra CONFIRMADO.");
        }
        
        return factura
    }

    //COMPARA ENTRE LOS DESCUENTOS DISPONIBLES
    private descuentoBeneficioso(): number {
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