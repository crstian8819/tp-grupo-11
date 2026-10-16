import { MedioPago } from "./medioPago";

export class Efectivo extends MedioPago {
    constructor(saldoDisponible:number) {
        super();
        this.saldoDisponible=saldoDisponible;
    }
}