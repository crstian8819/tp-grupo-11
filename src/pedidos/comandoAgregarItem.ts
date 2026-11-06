import { ComandoModificacion } from "./comandoModificacion";
import { TipoModificacion } from "./tipoModificacion";

export class ComandoAgregarItem extends ComandoModificacion {
    public ejecutar(): void {
        this.items.push(this.item);
    }

    public deshacer(): void {
        this.items.delete(this.item);
    }

    public getTipo(): TipoModificacion.AGREGAR {
        return TipoModificacion.AGREGAR;
    }
}