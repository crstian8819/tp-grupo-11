import { TipoMedioPago } from "./tipoMedioPago";
import { TipoTarjeta } from "./tipoTarjeta";

/**
 * Clase abstracta que representa el medio de pago seleccionado para una operacion.
 */
export abstract class MedioPago {
    private tipoMedioPago: TipoMedioPago;
    private tipoTarjeta: TipoTarjeta | undefined;
    
    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {TipoMedioPago} tipoPago - Dato necesario para inicializar el objeto.
     * @param {TipoTarjeta} tipoTarjeta - Dato necesario para inicializar el objeto.
     */
    public constructor(tipoPago:TipoMedioPago, tipoTarjeta?:TipoTarjeta) {
        this.tipoMedioPago = tipoPago;
        this.tipoTarjeta = tipoTarjeta ?? undefined;
    }

    /**
     * Devuelve el tipo de medio de pago.
     * @returns {TipoMedioPago} Resultado de la operacion.
     */
    public getTipoDePago(): TipoMedioPago {
        return this.tipoMedioPago
    }

    /**
     * Devuelve el tipo de tarjeta, si corresponde.
     * @returns {TipoTarjeta | undefined} Resultado de la operacion.
     */
    public getTipoDeTarjeta(): TipoTarjeta | undefined {
        return this.tipoTarjeta
    }
    
    /*public pagar(monto:number): boolean {
        return (this.saldoDisponible - monto) >= CERO
    }*/
}
