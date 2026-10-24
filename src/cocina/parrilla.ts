import { Cocina } from "./cocina";
import { TipoEstacion } from "./tipoEstacion";

export class Parrilla extends Cocina {
    public constructor() {
        super("Parrilla", TipoEstacion.PARRILLA);
    }
    

}