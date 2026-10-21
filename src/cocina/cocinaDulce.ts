import { Cocina } from "./cocina";
import { Categoria } from "../categoria";
import { TipoEstacion } from "./tipoEstacion";
export class CocinaDulce extends Cocina {
constructor() {
    super("Cocina Dulce", TipoEstacion.COCINA_DULCE);
}
    

}