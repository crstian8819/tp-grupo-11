import {Pedido} from "./pedido"

export class PedidoRetirar extends Pedido {
    private horario : number;

    public constructor(horario:number) {
        super()
        this.horario = horario;
    }

    public getHorario() : number {
        return this.horario;
    }

    public setHorario(horario: number): void {
        this.horario = horario;
    }

}