import {Categoria} from "./categoria";
import {EstadoItem} from "./estadoItem";

export class ItemIndividual {
    private nombre: string;
    private precio: number;
    private estado: EstadoItem | undefined;
    private categoria: Categoria | undefined;
    private cantidad: number;

    public constructor (estado?:EstadoItem, categoria?:Categoria) {
        this.nombre = "";
        this.precio = 0;
        this.cantidad = 0;
        this.estado = estado;
        this.categoria = categoria;
    }

    public setNombre (nombre:string) :void {
        this.nombre = nombre;
    }

    public setPrecio (precio:number) : void {
        this.precio = precio;
    }

    public setCantidad (cantidad:number) : void {
        this.cantidad = cantidad;
    }

    public setEstado (estado:EstadoItem) : void {
        this.estado = estado;
    }

    public setCategoria (categoria:Categoria) : void {
        this.categoria = categoria;
    }

    public getNombre () : string {
        return this.nombre;
    }

    public getPrecio () : number {
        return this.precio;
    }

    public getCantidad () : number {
        return this.cantidad;
    }

    public getEstado () : EstadoItem|undefined {
        return this.estado;
    }
    
    public getCategoria () : Categoria|undefined {
        return this.categoria;
    }
}