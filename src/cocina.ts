import { EstadoItem } from "./estadoItem";
import { ItemPedido } from "./itemPedido";

export abstract class Cocina{
    private nombre:string
    private items:ItemPedido[]

    constructor(nombre:string){
        this.nombre=nombre;
        this.items=[];
    }
    
    public getNombre():string{
        return this.nombre;
    }
    public getItems():ItemPedido[]{
        return this.items;
    }


    public recibirItem(item:ItemPedido):void{
        this.items.push(item)
    }
    public procesarSiguiente():void{
        const itemAProcesar=this.items.find(item => item.getEstado() !== EstadoItem.LISTO)
            if(itemAProcesar){
                itemAProcesar.avanzarEstado();
            }
    }
}