import { EstadoItem } from "../estadoItem";
import type { ItemPedido } from "../itemPedido";
//cada estado sabe si permite modificar y cual es el siguiente.
export interface EstadoPreparacion {
    getNombre():EstadoItem;
    puedeModificarse():boolean;
    avanzar(item:ItemPedido):void;
}