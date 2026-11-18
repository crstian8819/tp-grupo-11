/**
 * Define ErrorEnConfirmacion y su responsabilidad dentro del sistema.
 */
export class ErrorEnConfirmacion extends Error {
    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {string} mensaje - Dato necesario para inicializar el objeto.
     */
    public constructor(mensaje:string) {
        super(mensaje);
        this.name = "ErrorEnConfirmacion";
    }

    /**
     * Devuelve el mensaje asociado al error.
     * @returns {string} Resultado de la operacion.
     */
    public getMensaje(): string {
        return this.message
    }
}
