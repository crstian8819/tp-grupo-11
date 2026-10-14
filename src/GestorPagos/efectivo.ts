import { Descuento } from "./descuento";
import { Pedido } from "../pedido";
import { MedioPago } from "./medioPago";
export class Efectivo implements MedioPago, Descuento{
    private monto: number;

    public constructor(monto?:number) {
        this.monto=monto ?? 0;
    }

    //FALTA LOGICA DE IMPLEMENTACION
    public calcularDescuento(pedido: Pedido): number {
        return 0
    }

    public pagar(): void {}
}