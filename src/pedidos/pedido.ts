import {EstadoItem} from "../estadoItem";
import {EstadoPedido} from "../estadoPedido";
import {List} from "../estructuraDatos/listaEnlazada";
import { CERO, UNIDAD } from "../Constantes/constantes";
import { ItemPedido } from "../itemPedido";
import { ErrorEnPedido } from "../Errores/errorEnPedido";
import { ModificacionPedido } from "./modificacionPedido";
import { TipoModificacion } from "./tipoModificacion";
import { ComandoModificacion } from "./comandoModificacion";
import { ComandoAgregarItem } from "./comandoAgregarItem";
import { ComandoEliminarItem } from "./comandoEliminarItem";

/**
 * Clase abstracta que representa un pedido y administra sus items, estado, precio e historial de modificaciones.
 */
export abstract class Pedido {
    private items: List<ItemPedido>;
    private estado: EstadoPedido;
    private precioFinal: number;
    private cargoAdicional: number;
    private identificador : number;
    private historialModificaciones: ComandoModificacion[]; // Pila para deshacer ultima modificacion
    private registroModificaciones: ModificacionPedido[]; //Registro de todas las modificaciones
    private fecha: Date;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     */
    public constructor() {
        this.identificador = undefined as unknown as number;
        this.items = new List<ItemPedido>();
        this.precioFinal = CERO;
        this.cargoAdicional = CERO;
        this.estado = EstadoPedido.EN_CONSTRUCCION;
        this.historialModificaciones = [];
        this.registroModificaciones = [];
        this.fecha = new Date();
    }

    /**
     * Devuelve la fecha en la que se creo el pedido.
     * @returns {Date} Resultado de la operacion.
     */
    public getFecha(): Date {
        return this.fecha;
    }

    /**
     * Indica si el pedido se encuentra en construccion y permite modificaciones.
     * @returns {boolean} Resultado de la operacion.
     */
    public puedeModificarse () : boolean {
        return this.estado === EstadoPedido.EN_CONSTRUCCION;
    }

    /**
     * Agrega un item al pedido y registra la modificacion para poder deshacerla.
     * @param {ItemPedido} item - Item involucrado en la operacion.
     */
    public agregarItem(item: ItemPedido): void {
        if (!this.puedeModificarse()) {
            throw new ErrorEnPedido("No se pueden agregar ítems a un pedido confirmado o facturado.");
        }
        
        const comando = new ComandoAgregarItem(this.items, item);
        comando.ejecutar();
        this.historialModificaciones.push(comando);

        this.registroModificaciones.push(
            new ModificacionPedido(TipoModificacion.AGREGAR, item)
        );

        this.calcularPrecioFinal();
    }

    /**
     * Elimina un item del pedido y registra la modificacion para poder deshacerla.
     * @param {ItemPedido} item - Item involucrado en la operacion.
     */
    public eliminarItem(item: ItemPedido): void {
        if (!this.puedeModificarse()) {
            throw new ErrorEnPedido("No se pueden eliminar items de un pedido que no este en construcción.");
        }
        if (!this.items.search(item)) {
            throw new ErrorEnPedido("El item que se intenta eliminar no pertenece al pedido.");
        }
        if (!item.puedeModificarse()) {
            throw new ErrorEnPedido("No se puede eliminar un item en preparacion.");
        }

        const comando = new ComandoEliminarItem(this.items, item);
        comando.ejecutar();
        this.historialModificaciones.push(comando);

        this.registroModificaciones.push(
            new ModificacionPedido(TipoModificacion.ELIMINAR, item)
        );

        this.calcularPrecioFinal();
    }

    //metodo para deshacer ultima modificacion
    /**
     * Deshace la ultima modificacion realizada sobre el pedido.
     */
    public deshacerUltimaModificacion(): void {
        if (!this.puedeModificarse()) {
            throw new ErrorEnPedido("No se pueden deshacer cambios en un pedido ya confirmado.");
        }
        if (this.historialModificaciones.length === CERO) {
            throw new ErrorEnPedido("No existen modificaciones para deshacer.");
        }

        const ultimaModificacion = this.historialModificaciones[this.historialModificaciones.length-UNIDAD];
        ultimaModificacion.deshacer();
        this.historialModificaciones.pop();

        if (ultimaModificacion.getTipo() === TipoModificacion.AGREGAR) {
            this.registroModificaciones.push(
                new ModificacionPedido(TipoModificacion.DESHACER_AGREGAR, ultimaModificacion.getItem())
            );
        } else {
            this.registroModificaciones.push(
                new ModificacionPedido(TipoModificacion.DESHACER_ELIMINAR, ultimaModificacion.getItem())
            );
        }

        this.calcularPrecioFinal();
    }

    /**
     * Realiza la operacion calcularPrecioFinal dentro del sistema.
     * @returns {number} Resultado de la operacion.
     */
    protected calcularPrecioFinal(): number {
        let total = CERO;
        let headAux = this.items.getHead();
        while (headAux) {
            total += headAux.getValue().getTotal();
            headAux = headAux.getNext();
        }
        total += this.getCargosAdicionales();
        this.precioFinal = total;
        return this.precioFinal;
    }

    // Metodo para sumar cargos adicionales según modalidad (ej. costoEnvio)
    /**
     * Devuelve los cargos adicionales correspondientes al pedido.
     * @returns {number} Resultado de la operacion.
     */
    public getCargosAdicionales(): number {
        return this.cargoAdicional;
    }

    
    /**
     * Actualiza el estado del pedido o item.
     * @param {EstadoPedido} estado - Nuevo estado que se desea establecer.
     */
    public setEstado(estado: EstadoPedido) : void {
        this.estado = estado
    }

    /**
     * Devuelve el estado actual.
     * @returns {EstadoPedido} Resultado de la operacion.
     */
    public getEstado() : EstadoPedido {
        return this.estado;
    }

    /**
     * Asigna el identificador.
     * @param {number} identificador - Identificador del elemento.
     */
    public setID(identificador : number) : void {
        this.identificador = identificador;
    }

    /**
     * Devuelve el identificador.
     * @returns {number} Resultado de la operacion.
     */
    public getID() : number {
        return this.identificador;
    }

    /**
     * Devuelve una copia de los items recibidos por la cocina.
     * @returns {List<ItemPedido>} Resultado de la operacion.
     */
    public getItems(): List<ItemPedido> {
        return this.items;
    }

    /**
     * Muestra por consola los items que contiene el pedido.
     */
    public listItems(): void {
        let headAux = this.items.getHead();
        while (headAux) {
            console.log(`Item: ${headAux.getValue().getProducto().getNombre()}
            \nPrecio: ${headAux.getValue().getProducto()}`);
            headAux = headAux.getNext();
        }
    }
    
    /**
     * Calcula y devuelve el precio final del pedido.
     * @returns {number} Resultado de la operacion.
     */
    public getPrecioFinal() : number {
        return this.calcularPrecioFinal();
    }

    

    /**
     * Indica si el estado del pedido permite iniciar la facturacion.
     * @returns {boolean} Resultado de la operacion.
     */
    public puedeFacturar() : boolean {
        return this.estado === EstadoPedido.CONFIRMADO;
    }

    //Impide facturar hasta que el pedido este CONFIRMADO y todos los items esten LISTO
    /**
     * Verifica que el pedido este confirmado, no este vacio y que todos sus items esten listos.
     * @returns {boolean} Resultado de la operacion.
     */
    public listoParaFacturar(): boolean {
        let resultado = true
        if (this.estado !== EstadoPedido.CONFIRMADO) {
            resultado = false;
        }
        let headAux = this.items.getHead();
        if (!headAux) {
            resultado = false; //Un pedido vacio no se factura
        }
        while (headAux) {
            if (headAux.getValue().getEstado() !== EstadoItem.LISTO) {
                resultado = false;
            }
            headAux = headAux.getNext();
        }
        return resultado;
    }

}
