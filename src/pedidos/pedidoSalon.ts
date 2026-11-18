import {Pedido} from "./pedido"

/**
 * Representa un pedido asociado a una mesa del salon.
 */
export class PedidoSalon extends Pedido {
    private numeroMesa : number;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {number} nMesa - Dato necesario para inicializar el objeto.
     */
    public constructor(nMesa : number) {
        super()
        this.numeroMesa = nMesa;
    }

    /**
     * Devuelve el numero de mesa asociado al pedido.
     * @returns {number} Resultado de la operacion.
     */
    public getNumeroMesa() : number {
        return this.numeroMesa;
    }

    /**
     * Actualiza el numero de mesa.
     * @param {number} nMesa - Numero de mesa.
     */
    public setNumeroMesa(nMesa: number): void {
        this.numeroMesa = nMesa;
    }

}
