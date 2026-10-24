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
        return this.idFactura
    }

    public getInfoPedido(): string {
        return `ID: ${this.pedido.getID()}\nItems: ${this.pedido.getItems()}\n
        Precio Final: $${this.montoFinal}`
    }
    
}