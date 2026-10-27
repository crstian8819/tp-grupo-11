import { Pedido } from "../pedidos/pedido";

export interface DescuentoBeneficioso {
    calcularDescuento(pedido: Pedido): number;
}