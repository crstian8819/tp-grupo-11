import { Pedido } from "../pedido";
import { Descuento } from "./descuento";
export class DescuentoDia implements Descuento {
    private diaDeLaSemana: string | undefined;
    private porcentajeDescuento: number;

    public constructor(diaDeLaSemana?: string, porcentajeDescuento?: number) {
        this.diaDeLaSemana = diaDeLaSemana ?? undefined;
        this.porcentajeDescuento = porcentajeDescuento ?? 0;
    }

    //FALTA LOGICA DE IMPLEMENTACION
    public calcularDescuento(pedido: Pedido): number {
        return 0
    }
}