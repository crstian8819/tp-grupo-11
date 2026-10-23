import {Categoria} from "./categoria";
import { TipoEstacion } from "./cocina/tipoEstacion";
import { ZERO, UNNAMED } from "./Constantes/constantes";
import { Item } from "./item";

export class ItemIndividual extends Item {
    private categoria: Categoria;
    private estacion: TipoEstacion;

    public constructor (categoria:Categoria, estacion:TipoEstacion) {
        super();
        this.nombre = UNNAMED;
        this.precio = ZERO;
        this.categoria = categoria;
        this.estacion = estacion;
    }

    public getPrecio () : number {
        return this.precio;
    }
    
    public setNombre (nombre:string) :void {
        this.nombre = nombre;
    }

    public setPrecio (precio:number) : void {
        this.precio = precio;
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

    // el ! indica al compilador que confíe en que existe la categoria,etc.
    public getCategoria () : Categoria {
        return this.categoria!;
    }

    public getTipoEstacion () : TipoEstacion {
        return this.estacion!;
    }

}