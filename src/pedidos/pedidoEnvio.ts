import {Pedido} from "./pedido"
import { CERO } from "../Constantes/constantes";

/**
 * Representa un pedido que debe enviarse a una direccion y puede incluir costo de envio.
 */
export class PedidoEnvio extends Pedido {
    private direccion : string;
    private costoEnvio : number;
    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {string} direccion - Dato necesario para inicializar el objeto.
     */
    public constructor(direccion : string) {
        super()
        this.direccion = direccion;
        this.costoEnvio = CERO;
    }

    /**
     * Devuelve la direccion de envio.
     * @returns {string} Resultado de la operacion.
     */
    public getDireccion() : string {
        return this.direccion;
    }

    /**
     * Devuelve el costo de envio configurado.
     * @returns {number} Resultado de la operacion.
     */
    public getCostoEnvio() : number {
        return this.costoEnvio;
    }

    /**
     * Actualiza el costo de envio.
     * @param {number} precio - Precio o monto correspondiente.
     */
    public setCostoEnvio(precio: number): void {
        this.costoEnvio = precio;
        this.calcularPrecioFinal();
    }

    /**
     * Devuelve los cargos adicionales correspondientes al pedido.
     * @returns {number} Resultado de la operacion.
     */
    public getCargosAdicionales(): number {
        return this.costoEnvio;
    }

}
