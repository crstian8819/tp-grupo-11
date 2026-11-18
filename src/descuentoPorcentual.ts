import { Beneficio } from "./beneficio";
import { ErrorEnDescuento } from "./Errores/errorEnDescuento";
import { CERO, UNIDAD } from "./Constantes/constantes"
import { ItemIndividual } from "./itemIndividual";

/**
 * Beneficio que calcula el precio de un combo aplicando un porcentaje sobre sus productos.
 */
export class DescuentoPorcentual implements Beneficio {
    /**
     * @param descuento - Se aplica directamente en la multiplicación:
     * 0.9 = 10%;
     * 0.8 = 20%;
     * 0.7 = 30%;
     * ...
     */
    public constructor(private descuento:number) {
        if (descuento < CERO || descuento > UNIDAD) {
            throw new ErrorEnDescuento("El descuento debe estar entre 0 y 1");
        }
    }

    /**
     * Calcula el precio o beneficio que corresponde aplicar.
     * @param {ItemIndividual[]} items - Lista de items involucrados.
     * @returns {number} Resultado de la operacion.
     */
    public calcularBeneficio(items: ItemIndividual[]): number {
        let precioCombo:number = CERO;
        items.forEach((item: ItemIndividual) => {
            precioCombo += item.getPrecio();
        });
        precioCombo = precioCombo*this.descuento;
        return precioCombo;
    }
}
