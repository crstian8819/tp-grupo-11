import { MedioPago } from "./medioPago";
import { TipoMedioPago } from "./tipoMedioPago";

export class BilleteraVirtual extends MedioPago {
    public constructor(saldoDisponible:number) {
        super(TipoMedioPago.BILLETERA_VIRTUAL);
        this.saldoDisponible = saldoDisponible;
    }
}