import { TipoMedioPago } from "./tipoMedioPago";
import { TipoTarjeta } from "./tipoTarjeta";

export abstract class MedioPago {
    private tipoMedioPago: TipoMedioPago;
    private tipoTarjeta: TipoTarjeta | undefined;
    
    public constructor(tipoPago:TipoMedioPago, tipoTarjeta?:TipoTarjeta) {
        this.tipoMedioPago = tipoPago;
        this.tipoTarjeta = tipoTarjeta ?? undefined;
    }

    public getTipoDePago(): TipoMedioPago {
        return this.tipoMedioPago
    }

    public getTipoDeTarjeta(): TipoTarjeta | undefined {
        return this.tipoTarjeta
    }
    
    /*public pagar(monto:number): boolean {
        return (this.saldoDisponible - monto) >= CERO
    }*/
}