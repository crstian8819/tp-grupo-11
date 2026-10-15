import {Pedido} from "./pedido"

export class pedidoSalon extends Pedido{
    private numeroMesa : number;

    constructor(nMesa : number){
        super()
        this.numeroMesa = nMesa;
    }

    public getNumeroMesa() : number {
        return this.numeroMesa;
    }
}