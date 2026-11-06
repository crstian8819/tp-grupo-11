import { List } from "../estructuraDatos/listaEnlazada";
import { ItemPedido } from "../itemPedido";
import { ComandoModificacion } from "./comandoModificacion";
import { TipoModificacion } from "./tipoModificacion";

export class ComandoEliminarItem implements ComandoModificacion {
    private items: List<ItemPedido>;
    private item: ItemPedido;

    public constructor(items: List<ItemPedido>, item: ItemPedido) {
        this.items = items;
        this.item = item;
    }

    public ejecutar(): void {
        this.items.delete(this.item);
    }

    public deshacer(): void {
        this.items.push(this.item);
    }

    public getItem(): ItemPedido {
        return this.item;
    }

    public getTipo(): TipoModificacion.ELIMINAR {
        return TipoModificacion.ELIMINAR;
    }
}