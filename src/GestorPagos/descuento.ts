import { Pedido } from "../pedidos/pedido";

/**
 * Define el calculo del descuento mas beneficioso para un pedido.
 */
export interface DescuentoBeneficioso {
    /**
     * Compara los descuentos disponibles y devuelve el factor mas conveniente.
     * Si no hay descuentos aplicables, devuelve el factor sin descuento.
     * @param {Pedido} pedido - Pedido sobre el que se calcula el descuento.
     * @returns {number} Factor de descuento que corresponde aplicar.
     */
    calcularDescuento(pedido: Pedido): number;
}
