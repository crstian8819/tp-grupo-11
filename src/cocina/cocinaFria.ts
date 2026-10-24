import { Cocina } from "./cocina";
import { TipoEstacion } from "./tipoEstacion";
export class CocinaFria extends Cocina {
public constructor() {
    super("Cocina Fria",TipoEstacion.COCINA_FRIA);
}
    
}