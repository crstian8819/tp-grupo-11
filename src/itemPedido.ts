import { EstadoItem } from "./estadoItem"
import { Producto } from "./producto";
import { Item } from "./item";
export class ItemPedido {
        private item: Item;
        private cantidad: number;
        private estado: EstadoItem;

        constructor(item:Item,cantidad:number) {
            this.item=item;
            this.cantidad=cantidad;
            this.estado=EstadoItem.PENDIENTE;
        }

        public getItem():Item{
            return this.item;
        }
        public getCantidad():number{
            return this.cantidad;
        }
        public getEstado():EstadoItem{
            return this.estado;
        }

        public puedeModificarse():boolean{
            return this.estado === EstadoItem.PENDIENTE;
        }
        private static readonly SIGUIENTE_ESTADO = new Map< EstadoItem,EstadoItem>([
            [EstadoItem.PENDIENTE,EstadoItem.EN_PREPARACION],
            [EstadoItem.EN_PREPARACION,EstadoItem.LISTO],
            
        ]);
        public avanzarEstado():void{
            const siguiente =ItemPedido.SIGUIENTE_ESTADO.get(this.estado);
            if(!siguiente){
                throw new Error("El item ya está listo");
            }
           this.estado=siguiente;
        }
    }