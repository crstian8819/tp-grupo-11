import { SIN_NOMBRE } from "./Constantes/constantes";
import { CERO } from "./Constantes/constantes";
import { Producto } from "./producto";
import type { ItemIndividual } from "./itemIndividual";

export abstract class Item implements Producto {
    protected nombre:string;
    protected precio:number;

    public constructor(nombre?:string, precio?:number) {
        this.nombre=nombre ?? SIN_NOMBRE;
        this.precio=precio ?? CERO; 
    }

    public getPrecio(): number {
        return this.precio
    }

    public setPrecio(precio:number): void {
        this.precio = precio;
    }

    public getNombre(): string {
        return this.nombre
    }

    public setNombre(nombre:string): void {
        this.nombre = nombre;
    }

    public abstract getComponentes(): ItemIndividual[]; 
}