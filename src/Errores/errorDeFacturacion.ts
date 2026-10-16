export class ErrorDeFacturacion extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorDePago";
    }

    public getMensaje(): string {
        return this.message
    }
}