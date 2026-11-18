import { Cocina } from "./cocina";
import { TipoEstacion } from "./tipoEstacion";

/**
 * Estacion de cocina encargada de las preparaciones a la parrilla.
 */
export class Parrilla extends Cocina {
    /**
     * Inicializa el objeto y establece sus valores iniciales.
     */
    public constructor() {
        super("Parrilla", TipoEstacion.PARRILLA);
    }
    

}
