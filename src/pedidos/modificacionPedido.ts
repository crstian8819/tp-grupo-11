import { ItemPedido } from "../itemPedido";
import { TipoModificacion } from "./tipoModificacion";

/**
 * Registra el tipo de modificacion realizada y el item involucrado.
 */
export class ModificacionPedido {
    private tipo: TipoModificacion;
    private item: ItemPedido;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {TipoModificacion} tipo - Dato necesario para inicializar el objeto.
     * @param {ItemPedido} item - Dato necesario para inicializar el objeto.
     */
    public constructor(tipo: TipoModificacion, item: ItemPedido) {
        this.tipo = tipo;
        this.item = item;
    }

    /**
     * Devuelve el tipo de modificacion.
     * @returns {TipoModificacion} Resultado de la operacion.
     */
    public getTipo(): TipoModificacion {
        return this.tipo;
    }

    /**
     * Devuelve el item asociado a la modificacion.
     * @returns {ItemPedido} Resultado de la operacion.
     */
    public getItem(): ItemPedido {
        return this.item;
    }
}
