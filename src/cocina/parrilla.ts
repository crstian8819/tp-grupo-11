import { Cocina } from "./cocina";
import { TipoEstacion } from "./tipoEstacion";

export class Parrilla extends Cocina {
    constructor() {
        super("Parrilla", TipoEstacion.PARRILLA);
    }
    

}