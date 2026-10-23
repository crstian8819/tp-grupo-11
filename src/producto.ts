import type{ ItemIndividual } from "./itemIndividual";

export interface Producto {
    getPrecio():number;
    getNombre(): string;
    getComponentes():ItemIndividual[];
} 