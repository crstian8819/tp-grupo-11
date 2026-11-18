import { EstadoItem } from "./estadoItem";
import { Producto } from "./producto";
import { EstadoPreparacion } from "./cocina/estadoPreparacion";
import { Pendiente } from "./cocina/pendiente";
import { CERO, UNIDAD } from "./Constantes/constantes"
import { ErrorEnItemPedido } from "./Errores/errorEnItemPedido";

/**
 * Representa un producto dentro de un pedido, con cantidad y estado de preparacion.
 */
export class ItemPedido {
        private item: Producto;
        private cantidad: number;
        private estado: EstadoPreparacion;
        private preparaciones:ItemPedido[]=[];

        /**
         * Inicializa el objeto y establece sus valores iniciales.
         * @param {Producto} item - Dato necesario para inicializar el objeto.
         * @param {number} cantidad - Dato necesario para inicializar el objeto.
         */
        public constructor(item:Producto,cantidad:number) {
            if (!Number.isInteger(cantidad)|| cantidad < UNIDAD) {
                throw new ErrorEnItemPedido("La cantidad debe ser un entero mayor o igual a 1");
            }
            this.item=item;
            this.cantidad=cantidad;
            this.estado=new Pendiente();
            
        }
        

        /**
         * Devuelve el producto asociado a la linea del pedido.
         * @returns {Producto} Resultado de la operacion.
         */
        public getProducto():Producto {
            return this.item;
        }
        
        /**
         * Devuelve la cantidad solicitada.
         * @returns {number} Resultado de la operacion.
         */
        public getCantidad():number {
            return this.cantidad;
        }

        /**
         * Calcula el importe de la linea segun precio y cantidad.
         * @returns {number} Resultado de la operacion.
         */
        public getTotal() : number {
            return this.item.getPrecio() * this.cantidad;
        }
        /**
         * Asocia una preparacion individual a la linea del pedido.
         * @param {ItemPedido} preparacion - Item que representa una preparacion.
         */
        public agregarPreparacion(preparacion:ItemPedido):void {
            this.preparaciones.push(preparacion);
        }

        /**
         * Actualiza el estado del pedido o item.
         * @param {EstadoPreparacion} estado - Nuevo estado que se desea establecer.
         */
        public setEstado(estado: EstadoPreparacion): void {

        this.estado = estado;

        }

        /**
         * Devuelve el estado actual.
         * @returns {EstadoItem} Resultado de la operacion.
         */
        public getEstado():EstadoItem {
            if (this.preparaciones.length === CERO) {
                return this.estado.getNombre();
            }

            if (this.preparaciones.every(preparacion => preparacion.getEstado() === EstadoItem.LISTO)) {
                return EstadoItem.LISTO;
            }

            if (this.preparaciones.every(preparacion => preparacion.getEstado() === EstadoItem.PENDIENTE)) {

                return EstadoItem.PENDIENTE;

            }
        return EstadoItem.EN_PREPARACION;
        }

        /**
         * Indica si la linea del pedido puede modificarse segun su estado de preparacion.
         * @returns {boolean} Resultado de la operacion.
         */
        public puedeModificarse():boolean {
            if (this.preparaciones.length === CERO) {
                return this.estado.puedeModificarse();
            }
            return this.getEstado() === EstadoItem.PENDIENTE;
        }

        /**
         * Avanza al siguiente estado de preparacion cuando corresponde.
         */
        public avanzarEstado():void {
            if (this.preparaciones.length> CERO) {
                throw new ErrorEnItemPedido("Esta linea avanza segun las preparaciones en La cocina");
            }
            this.estado.avanzar(this);
        }
    }
