import { Pedido } from "../pedidos/pedido";
import { CERO } from "../Constantes/constantes";

export class Factura {
    private idFactura: number;
    private pedido: Pedido;
    private montoFinal: number;

    public constructor(pedido: Pedido, montoFinal:number) {
        this.idFactura=CERO;
        this.pedido=pedido;
        this.montoFinal=montoFinal;
    }

    public setIdFactura(idFactura: number): void {
        this.idFactura = idFactura;
    }

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

    public getMontoFinal(): number {
        return this.montoFinal;
    }
    
}