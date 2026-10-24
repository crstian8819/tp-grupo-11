import {Pedido} from "./pedido"
import { CERO } from "../Constantes/constantes";

export class PedidoEnvio extends Pedido {
    private direccion : string;
    private costoEnvio : number;
    public constructor(direccion : string) {
        super()
        this.direccion = direccion;
        this.costoEnvio = CERO;
    }

    public getDireccion() : string {
        return this.direccion;
    }

    public getCostoEnvio() : number {
        return this.costoEnvio;
    }

    public setCostoEnvio(precio: number): void {
        this.costoEnvio = precio;
        this.calcularPrecioFinal();
    }

    public getCargosAdicionales(): number {
        return this.costoEnvio;
    }

}