import {Categoria} from "./categoria";
import { TipoEstacion } from "./cocina/tipoEstacion";
import { ZERO } from "./Constantes/constantes";
import { UNNAMED } from "./Constantes/constantes";
import { Item } from "./item";
export class ItemIndividual extends Item {
    private cantidad: number;
    private categoria: Categoria;
    private estacion: TipoEstacion;

    public constructor (categoria:Categoria, estacion:TipoEstacion) {
        super();
        this.nombre = UNNAMED;
        this.precio = ZERO;
        this.cantidad = ZERO;
        this.categoria = categoria;
        this.estacion = estacion;
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

    //METODOS COMENTADOS YA QUE UN ITEM DEBE CREARSE CON: TipoEstacion y Categoria.
    /*public setCategoria (categoria:Categoria) : void {
        this.categoria = categoria;
    }*/

    /*public setTipoEstacion (estacion:TipoEstacion) : void {
        this.estacion = estacion;
    }*/

    public getNombre () : string {
        return this.nombre;
    }

    public getCantidad () : number {
        return this.cantidad;
    }

    // el ! indica al compilador que confíe en que existe la categoria,etc.
    public getCategoria () : Categoria {
        return this.categoria!;
    }

    public getTipoEstacion () : TipoEstacion {
        return this.estacion!;
    }

}