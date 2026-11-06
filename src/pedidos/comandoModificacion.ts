import { ItemPedido } from "../itemPedido";
import { TipoModificacion } from "./tipoModificacion";

export interface ComandoModificacion {
    ejecutar(): void;
    deshacer(): void;
    getItem(): ItemPedido;
    getTipo(): TipoModificacion.AGREGAR | TipoModificacion.ELIMINAR;
}