import {Categoria} from "./categoria";
import { TipoEstacion } from "./cocina/tipoEstacion";
import { ZERO } from "./Constantes/constantes";
import { UNNAMED } from "./Constantes/constantes";
import { Item } from "./item";
export class ItemIndividual extends Item {
    private cantidad: number;
    private categoria: Categoria | undefined;
    private estacion: TipoEstacion | undefined;

    public constructor (categoria?:Categoria, estacion?:TipoEstacion) {
        super();
        this.nombre = UNNAMED;
        this.precio = ZERO;
        this.cantidad = ZERO;
        this.categoria = categoria ?? undefined;
        this.estacion = estacion ?? undefined;
    }

    public getPrecio () : number {
        return this.precio * this.cantidad;
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

    public setCategoria (categoria:Categoria) : void {
        this.categoria = categoria;
    }

    public setTipoEstacion (estacion:TipoEstacion) : void {
        this.estacion = estacion;
    }

    public getNombre () : string {
        return this.nombre;
    }

    public getCantidad () : number {
        return this.cantidad;
    }

    public getCategoria () : Categoria|undefined {
        return this.categoria;
    }

    public getTipoEstacion () : TipoEstacion|undefined {
        return this.estacion;
    }

}