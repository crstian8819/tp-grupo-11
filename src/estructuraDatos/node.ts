/**
 * Nodo de una lista enlazada que almacena un valor y una referencia al siguiente nodo.
 */
export class MyNode<T> {
    private value : T;
    private next : MyNode<T>;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {T} value - Dato necesario para inicializar el objeto.
     */
    public constructor(value : T) {
        this.value = value;
        this.next = undefined as unknown as MyNode<T>;
    }

    /**
     * Devuelve el valor almacenado en el nodo.
     * @returns {T} Resultado de la operacion.
     */
    public getValue() : T {
        return this.value;
    }

    /**
     * Devuelve la referencia al siguiente nodo.
     * @returns {MyNode<T>} Resultado de la operacion.
     */
    public getNext() : MyNode<T> {
        return this.next;
    }

    /**
     * Establece el siguiente nodo.
     * @param {MyNode<T>} node - Nodo que se establece como siguiente.
     */
    public setNext(node : MyNode<T>) : void {
        this.next = node;
    }

}
