import { Pedido } from "../pedido";
export interface Descuento {
    calcularDescuento(pedido:Pedido): number;
}