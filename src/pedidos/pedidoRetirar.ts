import {Pedido} from "./pedido"

export class pedidoRetirar extends Pedido{
    private horario : number;

    constructor(horario:number){
        super()
        this.horario = horario;
    }

    public getHorario() : number {
        return this.horario;
    }
}