import { EstadoItem } from "../estadoItem";
import { EstadoPreparacion } from "./estadoPreparacion";
import { ItemPedido } from "../itemPedido";
import { Listo } from "./listo";

export class EnPreparacion implements EstadoPreparacion {
    public getNombre(): EstadoItem {
        return EstadoItem.EN_PREPARACION;
    }
    public puedeModificarse(): boolean {
        return false;
    }
    public avanzar(item: ItemPedido): void {
        item.setEstado(new Listo());
    }
}