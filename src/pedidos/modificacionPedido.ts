import { ItemPedido } from "../itemPedido";
import { TipoModificacion } from "./tipoModificacion";

export class ModificacionPedido {
    private tipo: TipoModificacion;
    private item: ItemPedido;

    public constructor(tipo: TipoModificacion, item: ItemPedido) {
        this.tipo = tipo;
        this.item = item;
    }

    public getTipo(): TipoModificacion {
        return this.tipo;
    }

    public getItem(): ItemPedido {
        return this.item;
    }
}