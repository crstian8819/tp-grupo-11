import { ZERO } from "../Constantes/constantes";
import { TipoMedioPago } from "./tipoMedioPago";

export abstract class MedioPago {
    protected saldoDisponible: number;
    protected tipoMedioPago: TipoMedioPago;
    
    public constructor(tipoPago:TipoMedioPago) {
        this.saldoDisponible = ZERO;
        this.tipoMedioPago = tipoPago;
    }

    public getSaldo(): number {
        return this.saldoDisponible
    }

    public setSaldo(saldo:number): void {
        this.saldoDisponible = saldo;
    }

    public getTipoDePago(): TipoMedioPago {
        return this.tipoMedioPago
    }

    public pagar(monto:number): boolean {
        return (this.saldoDisponible - monto) >= ZERO
    }
}