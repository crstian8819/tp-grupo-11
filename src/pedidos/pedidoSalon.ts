import {Pedido} from "./pedido"

export class PedidoSalon extends Pedido {
    private numeroMesa : number;

    constructor(nMesa : number) {
        super()
        this.numeroMesa = nMesa;
    }

    public getNumeroMesa() : number {
        return this.numeroMesa;
    }
}