import { Cocina } from "./cocina";
import { TipoEstacion } from "./tipoEstacion";
/**
 * Estacion de cocina encargada de las preparaciones dulces.
 */
export class CocinaDulce extends Cocina {
/**
 * Inicializa el objeto y establece sus valores iniciales.
 */
public constructor() {
    super("Cocina Dulce", TipoEstacion.COCINA_DULCE);
}
    

}
