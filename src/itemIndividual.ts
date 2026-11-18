import {Categoria} from "./categoria";
import { TipoEstacion } from "./cocina/tipoEstacion";
import { Item } from "./item";

/**
 * Representa un producto individual del menu, con categoria y estacion de preparacion.
 */
export class ItemIndividual extends Item {
    
    private categoria: Categoria;
    private estacion: TipoEstacion;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {string} nombre - Dato necesario para inicializar el objeto.
     * @param {Categoria} categoria - Dato necesario para inicializar el objeto.
     * @param {TipoEstacion} estacion - Dato necesario para inicializar el objeto.
     */
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

    
    /**
     * Devuelve la categoria del producto.
     * @returns {Categoria} Resultado de la operacion.
     */
    public getCategoria () : Categoria {
        return this.categoria;
    }

    /**
     * Devuelve la estacion de cocina asignada al producto.
     * @returns {TipoEstacion} Resultado de la operacion.
     */
    public getTipoEstacion () : TipoEstacion {
        return this.estacion;
    }
    // arreglo con el propio producto
    /**
     * Devuelve los productos individuales que componen el elemento.
     * @returns {ItemIndividual[]} Resultado de la operacion.
     */
    public getComponentes(): ItemIndividual[] {
        return [this];
    }

}
