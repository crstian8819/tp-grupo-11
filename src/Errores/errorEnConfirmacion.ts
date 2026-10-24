export class ErrorEnConfirmacion extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnConfirmacion";
    }

    public getMensaje(): string {
        return this.message
    }
}