export class ErrorEnItemPedido extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnItemPedido";
    }

    public getMensaje(): string {
        return this.message
    }
}