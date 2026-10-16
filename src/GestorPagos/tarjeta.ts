import { MedioPago } from "./medioPago";
import { TipoTarjeta } from "./tipoTarjeta";
import { ZERO } from "../Constantes/constantes";

export class Tarjeta extends MedioPago {
    private numero: number;
    private tipo: TipoTarjeta | undefined;

    constructor(numero?:number, tipo?:TipoTarjeta) {
        super();
        this.numero= numero ?? ZERO;
        this.tipo = tipo ?? undefined ;
    }

    public getNumero(): number {
        return this.numero
    }

    public getTipo(): string | undefined {
        return this.tipo
    }
}