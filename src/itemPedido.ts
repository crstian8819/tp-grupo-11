import { EstadoItem } from "./estadoItem";
import { Producto } from "./producto";
import { EstadoPreparacion } from "./cocina/estadoPreparacion";
import { Pendiente } from "./cocina/pendiente";
export class ItemPedido {
        private item: Producto;
        private cantidad: number;
        private estado: EstadoPreparacion;
        private preparaciones:ItemPedido[]=[];

        constructor(item:Producto,cantidad:number) {
            if(!Number.isInteger(cantidad)|| cantidad <1){
                throw new Error("La cantidad debe ser un entero mayor o igual a 1");
            }
            this.item=item;
            this.cantidad=cantidad;
            this.estado=new Pendiente();
            
        }
        

        public getProducto():Producto {
            return this.item;
        }
        
        public getCantidad():number {
            return this.cantidad;
        }

        public getTotal() : number {
            return this.item.getPrecio() * this.cantidad;
        }
        public agregarPreparacion(p:ItemPedido):void{
            this.preparaciones.push(p);
        }
        public setEstado(estado: EstadoPreparacion): void {
        this.estado = estado;
        }

        public getEstado():EstadoItem {
            if (this.preparaciones.length === 0) return this.estado.getNombre();
            if (this.preparaciones.every(p => p.getEstado() === EstadoItem.LISTO)) return EstadoItem.LISTO;
            if (this.preparaciones.every(p => p.getEstado() === EstadoItem.PENDIENTE)) return EstadoItem.PENDIENTE;
        return EstadoItem.EN_PREPARACION;
        }

        public puedeModificarse():boolean {
            if (this.preparaciones.length === 0) {return this.estado.puedeModificarse()};
            return this.getEstado() === EstadoItem.PENDIENTE;
        }

        

        public avanzarEstado():void {
            if(this.preparaciones.length>0){
                throw new Error ("Esta linea avanza segun las preparaciones en La cocina");
            }
            this.estado.avanzar(this);
        }
    }