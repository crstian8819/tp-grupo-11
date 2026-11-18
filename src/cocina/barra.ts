import { Cocina } from "./cocina";
import { TipoEstacion } from "./tipoEstacion";
/**
 * Estacion de cocina encargada de los productos asignados a la barra.
 */
export class Barra extends Cocina {
/**
 * Inicializa el objeto y establece sus valores iniciales.
 */
public constructor() {
    super("Barra", TipoEstacion.BARRA);
}
    

}
