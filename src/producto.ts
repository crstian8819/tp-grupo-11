import type { ItemIndividual } from "./itemIndividual";

/**
 * Interfaz comun para los productos que pueden incluirse en un pedido.
 */
export interface Producto {
    /** Devuelve el precio del producto. */
    getPrecio():number;
    /** Devuelve el nombre del producto. */
    getNombre(): string;
    /** Devuelve los componentes individuales del producto. */
    getComponentes():ItemIndividual[];
} 
