import { ComandoModificacion } from "./comandoModificacion";
import { TipoModificacion } from "./tipoModificacion";

export class ComandoEliminarItem extends ComandoModificacion {
    public ejecutar(): void {
        this.items.delete(this.item);
    }

    public deshacer(): void {
        this.items.push(this.item);
    }

    public getTipo(): TipoModificacion.ELIMINAR {
        return TipoModificacion.ELIMINAR;
    }
}