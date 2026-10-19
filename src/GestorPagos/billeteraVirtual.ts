import { MedioPago } from "./medioPago";
import { TipoMedioPago } from "./tipoMedioPago";

export class BilleteraVirtual extends MedioPago {
    constructor(saldoDisponible:number) {
        super(TipoMedioPago.BILLETERA_VIRTUAL);
        this.saldoDisponible = saldoDisponible;
    }
}