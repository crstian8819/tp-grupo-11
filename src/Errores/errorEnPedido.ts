export class ErrorEnPedido extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnPedido";
    }

    public getMensaje(): string {
        return this.message
    }
}