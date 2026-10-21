import { Cocina } from "./cocina";
import { Categoria } from "../categoria";
import { TipoEstacion } from "./tipoEstacion";

export class Parrilla extends Cocina {
    constructor() {
        super("Parrilla", TipoEstacion.PARRILLA);
    }
    

}