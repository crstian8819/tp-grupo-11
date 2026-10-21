import { Cocina } from "./cocina";
import { Categoria } from "../categoria";
import { TipoEstacion } from "./tipoEstacion";
export class CocinaFria extends Cocina {
constructor() {
    super("Cocina Fria",TipoEstacion.COCINA_FRIA);
}
    
}