import {Pedido} from "./pedido"

export class PedidoEnvio extends Pedido{
    private direccion : string;
    private costoEnvio : number;
    constructor(direccion : string){
        super()
        this.direccion = direccion;
        this.costoEnvio = undefined as unknown as number;
    }

    public getDireccion() : string {
        return this.direccion;
    }

    public getCostoEnvio() : number {
        return this.costoEnvio;
    }

    public setCostoEnvio(precio : number) : void {
        this.costoEnvio = precio;
    }
}