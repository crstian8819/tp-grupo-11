export class ErrorEnHistorial extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnHistorial";
    }

    public getMensaje(): string {
        return this.message
    }
}