import { EstadoItem } from "../estadoItem";
import { ItemPedido } from "../itemPedido";
import { TipoEstacion } from "./tipoEstacion";

export abstract class Cocina {
    protected nombre:string;
    protected items:ItemPedido[];
    protected tipo:TipoEstacion;
    private siguiente?: Cocina;

    constructor(nombre:string,tipo:TipoEstacion) {
        this.nombre=nombre;
        this.items=[];
        this.tipo=tipo;
    }
    
    public getNombre():string {
        return this.nombre;
    }

    public getItems():ItemPedido[] {
        return [...this.items];
    }
    
    public setSiguiente(cocina:Cocina):Cocina{
        this.siguiente=cocina;
        return cocina;
    }

    public buscarCocina(estacion:TipoEstacion):Cocina{
        if(this.atiende(estacion)){
            return this;
        }
        if(!this.siguiente){
            throw new Error(`No hay una cocina disponible para la estación ${estacion}`);

        }
        return this.siguiente.buscarCocina(estacion);
    }

    public atiende(estacion:TipoEstacion):boolean {
        return this.tipo === estacion;
    }

    public recibirItem(item:ItemPedido):void {
        this.items.push(item)
    }

    public procesarSiguiente():void {
        const siguiente=this.items.find(item => item.getEstado() !== EstadoItem.LISTO)
            if (!siguiente) {
               throw new Error(`No hay ítems para procesar en ${this.nombre}`) 
            }
            siguiente.avanzarEstado();
    }

}