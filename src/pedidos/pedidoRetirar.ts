import {Pedido} from "./pedido"

/**
 * Representa un pedido que el cliente retirara en un horario determinado.
 */
export class PedidoRetirar extends Pedido {
    private horario : number;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {number} horario - Dato necesario para inicializar el objeto.
     */
    public constructor(horario:number) {
        super()
        this.horario = horario;
    }

    /**
     * Devuelve el horario de retiro.
     * @returns {number} Resultado de la operacion.
     */
    public getHorario() : number {
        return this.horario;
    }

    /**
     * Actualiza el horario de retiro.
     * @param {number} horario - Horario de retiro.
     */
    public setHorario(horario: number): void {
        this.horario = horario;
    }

}
