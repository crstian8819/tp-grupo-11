import { Beneficio } from "./beneficio";
import { ErrorEnDescuento } from "./Errores/errorEnDescuento";
import { CERO } from "./Constantes/constantes";

export class PrecioFijo implements Beneficio {
    /**
     * 
     * @param precio - Precio fijo del Combo.
     */
    public constructor(private precio:number) {
        if (precio < CERO) {
            throw new ErrorEnDescuento("El precio fijo no puede ser negativo");
        }
    }

    public calcularBeneficio(): number {
        return this.precio;
    }
}