export class ErrorEnCocina extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnCocina";
    }

    public getMensaje(): string {
        return this.message
    }
}