export class MyNode<T> {
    private value : T;
    private next : MyNode<T>;

    public constructor(value : T) {
        this.value = value;
        this.next = undefined as unknown as MyNode<T>;
    }

    public getValue() : T {
        return this.value;
    }

    public getNext() : MyNode<T> {
        return this.next;
    }

    public setNext(node : MyNode<T>) : void {
        this.next = node;
    }

}