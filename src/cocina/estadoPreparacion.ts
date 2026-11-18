import { EstadoItem } from "../estadoItem";
import type { ItemPedido } from "../itemPedido";

/**
 * Define las operaciones que debe implementar cada estado de preparacion.
 */
export interface EstadoPreparacion {
    /** Devuelve el nombre del estado actual. */
    getNombre():EstadoItem;
    /** Indica si un item puede modificarse en este estado. */
    puedeModificarse():boolean;
    /** Avanza el item al siguiente estado de preparacion. */
    avanzar(item:ItemPedido):void;
}
