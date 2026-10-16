import { EstadoItem } from "./estadoItem"

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

        public marcarEnPreparacion():void{
            this.estado=EstadoItem.EN_PREPARACION;
        }
        public marcarListo():void{
            this.estado=EstadoItem.LISTO
        }
        public puedeModificarse():boolean{
            return this.estado === EstadoItem.PENDIENTE;
        }
        private static readonly SIGUIENTE_ESTADO = new Map< EstadoItem,EstadoItem>([
            [EstadoItem.PENDIENTE,EstadoItem.EN_PREPARACION],
            [EstadoItem.EN_PREPARACION,EstadoItem.LISTO],
            [EstadoItem.LISTO,EstadoItem.LISTO],
        ]);
        public avanzarEstado():void{
           this.estado=ItemPedido.SIGUIENTE_ESTADO.get(this.estado)!; //con ! le decimos que confie que estadoitem no va a ser undefined
        }
    }