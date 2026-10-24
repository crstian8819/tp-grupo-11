import { Cocina } from "./cocina";
import { TipoEstacion } from "./tipoEstacion";
export class CocinaDulce extends Cocina {
public constructor() {
    super("Cocina Dulce", TipoEstacion.COCINA_DULCE);
}
    

}