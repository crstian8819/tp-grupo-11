import { Cocina } from "./cocina";
import { Categoria } from "./categoria";
import { TipoEstacion } from "./tipoEstacion";
export class Barra extends Cocina{
constructor(){
    super("Barra", TipoEstacion.BARRA);
}
    

}