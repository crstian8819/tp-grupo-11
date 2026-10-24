export class ErrorEnMenu extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnMenu";
    }

    public getMensaje(): string {
        return this.message
    }
}