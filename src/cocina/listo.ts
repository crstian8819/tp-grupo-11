import { EstadoItem } from "../estadoItem";
import { EstadoPreparacion } from "./estadoPreparacion";
import { ItemPedido } from "../itemPedido";

export class Listo implements EstadoPreparacion {
    public getNombre(): EstadoItem {
        return EstadoItem.LISTO;
    }
    public puedeModificarse(): boolean {
        return false;
    }
    public avanzar(item: ItemPedido): void {
        throw new Error ("El item ya esta Listo");
    }
}