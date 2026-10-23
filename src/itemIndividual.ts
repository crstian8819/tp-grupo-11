import {Categoria} from "./categoria";
import { TipoEstacion } from "./cocina/tipoEstacion";
import { Item } from "./item";

export class ItemIndividual extends Item {
    
    private categoria: Categoria;
    private estacion: TipoEstacion;

    public constructor (nombre:string,categoria:Categoria, estacion:TipoEstacion) {
        super(nombre);
        
        
        this.categoria = categoria;
        this.estacion = estacion;
    }
    //item ya lo contiene,este lo hereda
    // public getPrecio () : number {
    //     return this.precio;
    // }
    
    // public setNombre (nombre:string) :void {
    //     this.nombre = nombre;
    // }

    // public setPrecio (precio:number) : void {
    //     this.precio = precio;
    // }

    //METODOS COMENTADOS YA QUE UN ITEM DEBE CREARSE CON: TipoEstacion y Categoria.
    /*public setCategoria (categoria:Categoria) : void {
        this.categoria = categoria;
    }*/

    /*public setTipoEstacion (estacion:TipoEstacion) : void {
        this.estacion = estacion;
    }*/

    // public getNombre () : string {
    //     return this.nombre;
    // }

    
    public getCategoria () : Categoria {
        return this.categoria;
    }

    public getTipoEstacion () : TipoEstacion {
        return this.estacion;
    }
    // arreglo con el propio producto
    public getComponentes(): ItemIndividual[] {
        return [this];
    }

}