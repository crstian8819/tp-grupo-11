import { EstadoItem } from "./estadoItem";
import { ItemPedido } from "./itemPedido";
import { Categoria } from "./categoria";
import { TipoEstacion } from "./tipoEstacion";

export abstract class Cocina{
    protected nombre:string
    protected items:ItemPedido[]
    protected tipo:TipoEstacion

    constructor(nombre:string,tipo:TipoEstacion){
        this.nombre=nombre;
        this.items=[]
        this.tipo=tipo;
    }
    
    public getNombre():string{
        return this.nombre;
    }
    public getItems():ItemPedido[]{
        return this.items;
    }
    public atender(estacion:TipoEstacion):boolean{
        return this.tipo === estacion;
    };


    public recibirItem(item:ItemPedido):void{
        this.items.push(item)
    }
    public procesarSiguiente():void{
        const itemAProcesar=this.items.find(item => item.getEstado() !== EstadoItem.LISTO)
            if(!itemAProcesar){
               throw new Error(`No hay items para procesar en ${this.nombre}`) 
            }
            itemAProcesar.avanzarEstado();
    }
}