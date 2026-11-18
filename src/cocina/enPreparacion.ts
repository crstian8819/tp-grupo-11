import { EstadoItem } from "../estadoItem";
import { EstadoPreparacion } from "./estadoPreparacion";
import { ItemPedido } from "../itemPedido";
import { Listo } from "./listo";
/*eslint-disable @typescript-eslint/class-methods-use-this*/
export class EnPreparacion implements EstadoPreparacion {
    /**
     * Devuelve el nombre del estado de preparacion.
     * @returns {EstadoItem} Resultado de la operacion.
     */
    public getNombre(): EstadoItem {
        return EstadoItem.EN_PREPARACION;
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
     * @param {ItemPedido} item - Item involucrado en la operacion.
     */
    public avanzar(item: ItemPedido): void {
        item.setEstado(new Listo());
    }
}
