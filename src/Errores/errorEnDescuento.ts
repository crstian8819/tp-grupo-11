export class ErrorEnDescuento extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnDescuento";
    }

    public getMensaje(): string {
        return this.message
    }
}