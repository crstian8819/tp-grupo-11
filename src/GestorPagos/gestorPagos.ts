import { MedioPago } from "./medioPago";
import { DescuentoDia } from "./descuentoDia";
import { Factura } from "./factura";
import { Pedido } from "../pedido";
import { Descuento } from "./descuento";
import { estadoPedido as EstadoPedido } from "../estadoPedido"
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
        this.descuentoEnEfectivo = TEN_PERCENT;
    }

    public setMedioPago(medioPago:MedioPago): void {
        this.medioPago=medioPago;
    }

    public setDescuentoDelDia(diaDeLaSemana: string, porcentaje:number): void {
        this.descuentoDelDia?.setDiaDeLaSemana(diaDeLaSemana);
        this.descuentoDelDia?.setPorcentajeDescuento(porcentaje);
    }

    public calcularDescuento(pedido: Pedido): number {
        return pedido.getPrecio()*this.descuentoEnEfectivo
    }

    //Si hay descuento del dia, 
    // compararlo con el descuento en efectivo
    //
    //No puedo conseguir el monto del descuento en efectivo
    //Porque el upCasting es con medioPago que solo tiene Pagar()
    //Asi que, GestorPagos implemento Descuento para:
    //CalcularDescuento(pedido:Pedido):number
    //Y hacer la comparacion
    ////FALTA: DISTINGUIR CUANDO PAGA EN EFECTIVO.
    public cobrar(pedido: Pedido): Factura {
        if (pedido.puedeFacturar()) {
            if (this.medioPago) {
                const monto:number = pedido.getPrecioFinal()*this.descuentoBeneficioso(pedido);
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
    //FALTA: DISTINGUIR CUANDO PAGA EN EFECTIVO.
    private descuentoBeneficioso(pedido: Pedido): number {
        let mayorBeneficio:number=ONE_;
        if (this.descuentoDelDia==undefined) {
            mayorBeneficio = this.descuentoEnEfectivo;
        }
        else if (this.descuentoDelDia.calcularDescuento(pedido) < this.calcularDescuento(pedido)) {
            mayorBeneficio = this.descuentoDelDia.getPorcentajeDescuento();
        }
        return mayorBeneficio
    }

}