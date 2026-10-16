import { MedioPago } from "./medioPago";

export class BilleteraVirtual extends MedioPago {
    constructor(saldoDisponible:number) {
        super();
        this.saldoDisponible = saldoDisponible;
    }
}