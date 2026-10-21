import { EstadoItem } from "./estadoItem"
import { Producto } from "./producto"
export class ItemPedido {
        private producto: Producto
        private estado: EstadoItem
        private cantidad: number
        constructor(producto:Producto,cantidad:number){
            this.producto=producto;
            this.cantidad=cantidad;
            this.estado=EstadoItem.PENDIENTE;
        }

        public getProducto():Producto{
            return this.producto;
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