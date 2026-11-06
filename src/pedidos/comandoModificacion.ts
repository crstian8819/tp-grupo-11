import { List } from "../estructuraDatos/listaEnlazada";
import { ItemPedido } from "../itemPedido";
import { TipoModificacion } from "./tipoModificacion";

export abstract class ComandoModificacion {
    protected items: List<ItemPedido>;
    protected item: ItemPedido;

    public constructor(items: List<ItemPedido>, item: ItemPedido) {
        this.items = items;
        this.item = item;
    }

    public getItem(): ItemPedido {
        return this.item;
    }

    
    abstract ejecutar(): void;
    abstract deshacer(): void;
    abstract getTipo(): TipoModificacion.AGREGAR | TipoModificacion.ELIMINAR;
}