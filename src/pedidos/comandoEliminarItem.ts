import { ComandoModificacion } from "./comandoModificacion";
import { TipoModificacion } from "./tipoModificacion";
/*eslint-disable @typescript-eslint/class-methods-use-this*/
export class ComandoEliminarItem extends ComandoModificacion {
    /**
     * Ejecuta la modificacion representada por el comando.
     */
    public ejecutar(): void {
        this.items.delete(this.item);
    }

    /**
     * Revierte la modificacion realizada por el comando.
     */
    public deshacer(): void {
        this.items.push(this.item);
    }

    /**
     * Devuelve el tipo de modificacion.
     * @returns {TipoModificacion.ELIMINAR} Resultado de la operacion.
     */
    public getTipo(): TipoModificacion.ELIMINAR {
        return TipoModificacion.ELIMINAR;
    }
}
