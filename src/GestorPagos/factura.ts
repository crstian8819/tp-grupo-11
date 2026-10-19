import { Pedido } from "../pedido";
export class Factura {
    private idFactura: string;
    private pedido: Pedido;
    private montoFinal: number;

    //idFactura podría generarse por el length de pedidosFinalizados
    //pedidosFinalizados podría ser una lista de las Facturas. (pedidos ya cobrados)
    public constructor(/*idFactura:number,*/ pedido: Pedido, montoFinal:number) {
        this.idFactura='';
        this.pedido=pedido;
        this.montoFinal=montoFinal;
    }
}