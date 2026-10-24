export class ErrorEnFacturacion extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnFacturacion";
    }

    public getMensaje(): string {
        return this.message
    }
}