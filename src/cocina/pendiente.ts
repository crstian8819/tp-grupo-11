import { EnPreparacion } from "./enPreparacion";
import { EstadoItem } from "../estadoItem";
import { EstadoPreparacion } from "./estadoPreparacion";
import { ItemPedido } from "../itemPedido";

/*eslint-disable @typescript-eslint/class-methods-use-this*/
export class Pendiente implements EstadoPreparacion {
    /**
     * Devuelve el nombre del estado de preparacion.
     * @returns {EstadoItem} Resultado de la operacion.
     */
    public getNombre(): EstadoItem {
        return EstadoItem.PENDIENTE;
    }
    /**
     * Indica si el item puede modificarse mientras se encuentra en este estado.
     * @returns {boolean} Resultado de la operacion.
     */
    public puedeModificarse(): boolean {
        return true;
    }
    /**
     * Cambia el item al siguiente estado de preparacion.
     * @param {ItemPedido} item - Item involucrado en la operacion.
     */
    public avanzar(item: ItemPedido): void {
        item.setEstado(new EnPreparacion());
    }
}
