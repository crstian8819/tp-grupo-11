import { EstadoItem } from "../estadoItem";
import { EstadoPreparacion } from "./estadoPreparacion";
import { ErrorEnCocina } from "../Errores/errorEnCocina";

/*eslint-disable @typescript-eslint/class-methods-use-this*/
export class Listo implements EstadoPreparacion {
    public getNombre(): EstadoItem {
        return EstadoItem.LISTO;
    }
    public puedeModificarse(): boolean {
        return false;
    }
    public avanzar(): void {
        throw new ErrorEnCocina("El item ya esta Listo");
    }
}