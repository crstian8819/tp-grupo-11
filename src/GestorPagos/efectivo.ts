import { MedioPago } from "./medioPago";
import { TipoMedioPago } from "./tipoMedioPago";

export class Efectivo extends MedioPago {
    constructor(saldoDisponible:number) {
        super(TipoMedioPago.EFECTIVO);
        this.saldoDisponible=saldoDisponible;
    }
}