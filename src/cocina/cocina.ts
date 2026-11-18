import { EstadoItem } from "../estadoItem";
import { ItemPedido } from "../itemPedido";
import { TipoEstacion } from "./tipoEstacion";
import { ErrorEnCocina } from "../Errores/errorEnCocina";

/**
 * Clase abstracta que representa una estacion de cocina dentro de la cadena de preparacion.
 */
export abstract class Cocina {
    protected nombre:string;
    protected items:ItemPedido[];
    protected tipo:TipoEstacion;
    private siguiente?: Cocina;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {string} nombre - Dato necesario para inicializar el objeto.
     * @param {TipoEstacion} tipo - Dato necesario para inicializar el objeto.
     */
    public constructor(nombre:string,tipo:TipoEstacion) {
        this.nombre=nombre;
        this.items=[];
        this.tipo=tipo;
    }
    
    /**
     * Devuelve el nombre del estado de preparacion.
     * @returns {string} Resultado de la operacion.
     */
    public getNombre():string {
        return this.nombre;
    }

    /**
     * Devuelve una copia de los items recibidos por esta cocina.
     * @returns {ItemPedido[]} Resultado de la operacion.
     */
    public getItems():ItemPedido[] {
        return [...this.items];
    }
    
    /**
     * Establece la siguiente cocina dentro de la cadena.
     * @param {Cocina} cocina - Estacion de cocina que se desea agregar o enlazar.
     * @returns {Cocina} Resultado de la operacion.
     */
    public setSiguiente(cocina:Cocina):Cocina {
        this.siguiente=cocina;
        return cocina;
    }

    /**
     * Recorre la cadena y devuelve la cocina que atiende la estacion indicada.
     * @param {TipoEstacion} estacion - Estacion a localizar.
     * @returns {Cocina} Resultado de la operacion.
     */
    public buscarCocina(estacion:TipoEstacion):Cocina {
        if (this.atiende(estacion)) {
            return this;
        }
        if (!this.siguiente) {
            throw new ErrorEnCocina(`No hay una cocina disponible para la estación ${estacion}`);

        }
        return this.siguiente.buscarCocina(estacion);
    }

    /**
     * Indica si esta cocina atiende la estacion indicada.
     * @param {TipoEstacion} estacion - Estacion a localizar.
     * @returns {boolean} Resultado de la operacion.
     */
    public atiende(estacion:TipoEstacion):boolean {
        return this.tipo === estacion;
    }

    /**
     * Agrega un item a la cola de preparacion de la cocina.
     * @param {ItemPedido} item - Item involucrado en la operacion.
     */
    public recibirItem(item:ItemPedido):void {
        this.items.push(item)
    }

    /**
     * Avanza el estado del siguiente item pendiente de preparacion.
     */
    public procesarSiguiente():void {
        const siguiente=this.items.find(item => item.getEstado() !== EstadoItem.LISTO)
            if (!siguiente) {
               throw new ErrorEnCocina(`No hay ítems para procesar en ${this.nombre}`) 
            }
            siguiente.avanzarEstado();
    }

}
