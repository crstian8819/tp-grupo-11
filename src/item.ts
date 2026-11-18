import { SIN_NOMBRE } from "./Constantes/constantes";
import { CERO } from "./Constantes/constantes";
import { Producto } from "./producto";
import type { ItemIndividual } from "./itemIndividual";

/**
 * Clase abstracta que representa un elemento del menu con nombre y precio.
 */
export abstract class Item implements Producto {
    protected nombre:string;
    protected precio:number;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {string} nombre - Dato necesario para inicializar el objeto.
     * @param {number} precio - Dato necesario para inicializar el objeto.
     */
    public constructor(nombre?:string, precio?:number) {
        this.nombre=nombre ?? SIN_NOMBRE;
        this.precio=precio ?? CERO; 
    }

    /**
     * Devuelve el precio actual.
     * @returns {number} Resultado de la operacion.
     */
    public getPrecio(): number {
        return this.precio
    }

    /**
     * Actualiza el precio del item.
     * @param {number} precio - Precio o monto correspondiente.
     */
    public setPrecio(precio:number): void {
        this.precio = precio;
    }

    /**
     * Devuelve el nombre del item.
     * @returns {string} Resultado de la operacion.
     */
    public getNombre(): string {
        return this.nombre
    }

    /**
     * Actualiza el nombre del elemento.
     * @param {string} nombre - Nombre utilizado para identificar el elemento.
     */
    public setNombre(nombre:string): void {
        this.nombre = nombre;
    }

    /**
     * Devuelve los productos individuales que componen el elemento.
     * @returns {ItemIndividual[]} Resultado de la operacion.
     */
    public abstract getComponentes(): ItemIndividual[]; 
}
