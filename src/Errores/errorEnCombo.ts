export class ErrorEnCombo extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnCombo";
    }

    public getMensaje(): string {
        return this.message
    }
}