import { EstadoItem } from "../estadoItem";
import { EstadoPreparacion } from "./estadoPreparacion";
import { ErrorEnCocina } from "../Errores/errorEnCocina";

/*eslint-disable @typescript-eslint/class-methods-use-this*/
export class Listo implements EstadoPreparacion {
    /**
     * Devuelve el nombre del estado de preparacion.
     * @returns {EstadoItem} Resultado de la operacion.
     */
    public getNombre(): EstadoItem {
        return EstadoItem.LISTO;
    }
    /**
     * Indica si el item puede modificarse mientras se encuentra en este estado.
     * @returns {boolean} Resultado de la operacion.
     */
    public puedeModificarse(): boolean {
        return false;
    }
    /**
     * Cambia el item al siguiente estado de preparacion.
     */
    public avanzar(): void {
        throw new ErrorEnCocina("El item ya esta Listo");
    }
}
