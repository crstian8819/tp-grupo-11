import { EnPreparacion } from "./enPreparacion";
import { EstadoItem } from "../estadoItem";
import { EstadoPreparacion } from "./estadoPreparacion";
import { ItemPedido } from "../itemPedido";

export class Pendiente implements EstadoPreparacion {
    public getNombre(): EstadoItem {
        return EstadoItem.PENDIENTE;
    }
    public puedeModificarse(): boolean {
        return true;
    }
    public avanzar(item: ItemPedido): void {
        item.setEstado(new EnPreparacion());
    }
}