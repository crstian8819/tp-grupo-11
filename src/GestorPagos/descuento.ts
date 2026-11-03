import { Pedido } from "../pedidos/pedido";
export interface DescuentoBeneficioso {
    /**
     * Compara entre los descuentos disponibles el más beneficioso y lo aplica.
     * De no haber ninguno, deja el precio original del pedido.
    */
    calcularDescuento(pedido: Pedido): number;
}