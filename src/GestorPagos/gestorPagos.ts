import { MedioPago } from "./medioPago";
import { DescuentoDia } from "./descuentoDia";
import { Factura } from "./factura";
import { Pedido } from "../pedido";
export class GestorPagos {
    private medioPago: MedioPago | undefined;
    private descuentoDelDia: DescuentoDia | undefined;

    public constructor() {}

    public setMedioPago(medioPago:MedioPago): void {
        this.medioPago=medioPago;
    }

    public setDescuentoDelDia(diaDeLaSemana: string, porcentaje:number): void {
        this.descuentoDelDia?.setDiaDeLaSemana(diaDeLaSemana);
        this.descuentoDelDia?.setPorcentajeDescuento(porcentaje);

    }
    //FALTA LOGICA DE IMPLEMENTACION (con sus excepciones)
    /*public cobrar(pedido: Pedido): Factura {
        const factura = new Factura(pedido, pedido.getPrecio());
        
        return factura
    }*/
}