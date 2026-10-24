import { MedioPago } from "./medioPago";
import { TipoTarjeta } from "./tipoTarjeta";
import { CERO } from "../Constantes/constantes";
import { TipoMedioPago } from "./tipoMedioPago";

export class Tarjeta extends MedioPago {
    private numero: number;
    private tipo: TipoTarjeta | undefined;

    public constructor(numero?:number, tipo?:TipoTarjeta) {
        super(TipoMedioPago.TARJETA);
        this.numero= numero ?? CERO;
        this.tipo = tipo ?? undefined ;
    }

    public getNumero(): number {
        return this.numero
    }

    public getTipo(): string | undefined {
        return this.tipo
    }
}