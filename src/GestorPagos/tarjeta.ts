import { MedioPago } from "./medioPago";
import { TipoTarjeta } from "./tipoTarjeta";
export class Tarjeta implements MedioPago {
    numero: number;
    tipo: TipoTarjeta | undefined;

    public constructor(numero?:number, tipo?:TipoTarjeta) {
        this.numero= numero ?? 0;
        this.tipo = tipo ?? undefined ;
    }

    //FALTA LOGICA DE IMPLEMENTACION
    public pagar(monto:number): void {

    }
}