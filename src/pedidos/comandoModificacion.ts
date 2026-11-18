import { List } from "../estructuraDatos/listaEnlazada";
import { ItemPedido } from "../itemPedido";
import { TipoModificacion } from "./tipoModificacion";

/**
 * Clase abstracta para encapsular una modificacion que puede ejecutarse y deshacerse.
 */
export abstract class ComandoModificacion {
    protected items: List<ItemPedido>;
    protected item: ItemPedido;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {List<ItemPedido>} items - Dato necesario para inicializar el objeto.
     * @param {ItemPedido} item - Dato necesario para inicializar el objeto.
     */
    public constructor(items: List<ItemPedido>, item: ItemPedido) {
        this.items = items;
        this.item = item;
    }

    /**
     * Devuelve el item asociado a la modificacion.
     * @returns {ItemPedido} Resultado de la operacion.
     */
    public getItem(): ItemPedido {
        return this.item;
    }

    
    /**
     * Ejecuta la modificacion representada por el comando.
     */
    public abstract ejecutar(): void;
    /**
     * Revierte la modificacion realizada por el comando.
     */
    public abstract deshacer(): void;
    /**
     * Devuelve el tipo de modificacion.
     * @returns {TipoModificacion.AGREGAR | TipoModificacion.ELIMINAR} Resultado de la operacion.
     */
    public abstract getTipo(): TipoModificacion.AGREGAR | TipoModificacion.ELIMINAR;
}
