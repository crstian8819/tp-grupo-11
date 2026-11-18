import { Beneficio } from "./beneficio";
import { ErrorEnDescuento } from "./Errores/errorEnDescuento";
import { CERO } from "./Constantes/constantes";

/**
 * Beneficio que establece un precio fijo para un combo.
 */
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

    /**
     * Calcula el precio o beneficio que corresponde aplicar.
     * @returns {number} Resultado de la operacion.
     */
    public calcularBeneficio(): number {
        return this.precio;
    }
}
