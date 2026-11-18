import { Pedido } from "../pedidos/pedido";
import { CERO } from "../Constantes/constantes";

/**
 * Representa la factura generada a partir de un pedido y su monto final.
 */
export class Factura {
    private idFactura: number;
    private pedido: Pedido;
    private montoFinal: number;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {Pedido} pedido - Dato necesario para inicializar el objeto.
     * @param {number} montoFinal - Dato necesario para inicializar el objeto.
     */
    public constructor(pedido: Pedido, montoFinal:number) {
        this.idFactura=CERO;
        this.pedido=pedido;
        this.montoFinal=montoFinal;
    }

    /**
     * Asigna el identificador de la factura.
     * @param {number} idFactura - Dato necesario para realizar la operacion.
     */
    public setIdFactura(idFactura: number): void {
        this.idFactura = idFactura;
    }

    /**
     * Devuelve el identificador de la factura.
     * @returns {number} Resultado de la operacion.
     */
    public getIdFactura(): number {
        return this.idFactura;
    }
    /**
     * CONSIDERACION: Factura recibe el Pedido original...
     * para mayor seguridad habría que generar una 'snapshot' al
     * momento de facturar el pedido y generar la factura.
     */
    public getPedido(): Pedido {
        return this.pedido;
    }

    /**
     * Devuelve el monto final de la factura.
     * @returns {number} Resultado de la operacion.
     */
    public getMontoFinal(): number {
        return this.montoFinal;
    }
    
}
