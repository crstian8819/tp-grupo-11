export class ErrorEnDistribucion extends Error {
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnDistribucion";
    }

    public getMensaje(): string {
        return this.message
    }
}