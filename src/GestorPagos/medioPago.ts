import { ZERO } from "../Constantes/constantes";
export abstract class MedioPago {
    protected saldoDisponible: number;
    
    constructor() {
        this.saldoDisponible = ZERO;
    }

    public getSaldo(): number {
        return this.saldoDisponible
    }

    public setSaldo(saldo:number): void {
        this.saldoDisponible = saldo;
    }

    public pagar(monto:number): boolean {
        return (this.saldoDisponible - monto) >= ZERO
    }
}