import {Pedido} from "./pedido"
import {ZERO} from "../Constantes/constantes"

export class PedidoSalon extends Pedido {
    private numeroMesa : number;

    public constructor(nMesa : number) {
        super()
        this.numeroMesa = nMesa;
    }

    public getNumeroMesa() : number {
        return this.numeroMesa;
    }

    public setNumeroMesa(nMesa: number): void {
        this.numeroMesa = nMesa;
    }

    public getCargosAdicionales(): number {
        return ZERO;
    }
}