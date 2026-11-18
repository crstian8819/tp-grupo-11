import { Cocina } from "./cocina";
import { TipoEstacion } from "./tipoEstacion";
/**
 * Estacion de cocina encargada de las preparaciones frias.
 */
export class CocinaFria extends Cocina {
/**
 * Inicializa el objeto y establece sus valores iniciales.
 */
public constructor() {
    super("Cocina Fria",TipoEstacion.COCINA_FRIA);
}
    
}
