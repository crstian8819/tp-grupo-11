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
        public avanzarEstado():void{
            if(this.estado === EstadoItem.PENDIENTE){
                this.estado= EstadoItem.EN_PREPARACION;

            }else if(this.estado === EstadoItem.EN_PREPARACION){
                this.estado=EstadoItem.LISTO
            }
        }
    }