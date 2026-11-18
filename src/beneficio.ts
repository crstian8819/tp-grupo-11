import { ItemIndividual } from "./itemIndividual";

/**
 * Define una estrategia para calcular el beneficio o precio de un combo.
 */
export interface Beneficio {
    /**
     * Calcula el precio del combo a partir de los productos que lo componen.
     * @param {ItemIndividual[]} items - Productos incluidos en el combo.
     * @returns {number} Precio calculado para el combo.
     */
    calcularBeneficio(items: ItemIndividual[]): number;
}
