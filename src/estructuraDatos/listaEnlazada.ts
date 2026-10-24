import {MyNode} from "./node";

export class List<T> {
    
    private head: MyNode<T>;
    constructor() {
        this.head = undefined as unknown as MyNode<T>;
    }

    public getHead() : MyNode<T> {
        return this.head;
    }
    public push(value: T): MyNode<T> {
        const node = new MyNode(value);
        let headAux = this.head;
        while (headAux && headAux.getNext()) {
        headAux = headAux.getNext();
        }
        if (!headAux) {
        this.head = node
        }
        else {
        headAux.setNext(node);
        }
        return node;
    }

    public pop(): T {
        let value = undefined;
        let headAux = this.head;
        let previous:MyNode<T> = undefined as unknown as MyNode<T>;
        while (headAux && headAux.getNext()) {
        previous = headAux;
        headAux = headAux.getNext();
        }
        if (!previous) {
        this.head = undefined as unknown as MyNode<T>;
        }
        else {
        previous.setNext(undefined as unknown as MyNode<T>);
        }
        value = headAux.getValue();
        return value;
    }

    public insertFirst(value: T): MyNode<T> {
        const node = new MyNode(value);
        node.setNext(this.head);
        this.head = node;
        return node;
    }

    public removeFirst(): T {
        let value = undefined as unknown as T;
        if (this.head) {
        value = this.head.getValue();
        this.head = this.head.getNext();
        }
        return value;
    }

    public insertOrdered(value: T): MyNode<T> {
        const node = new MyNode(value);
        let headAux = this.head;
        let previous:MyNode<T> = undefined as unknown as MyNode<T>;
        while (headAux && headAux.getValue() < value) {
        previous = headAux;
        headAux = headAux.getNext();
        }
        if (!previous) {
        this.head = node;
        }
        else {
        previous.setNext(node);
        }
        node.setNext(headAux);
        return node;
    }

    public insertUnique(value: T): MyNode<T> {
        const node = this.search(value);
        if (!node) {
        this.insertOrdered(value);
        }
        return node;
    }

    public delete(value: T): T {
        let headAux = this.head;
        let previous:MyNode<T> = undefined as unknown as MyNode<T>;
        while (headAux && headAux.getValue() !== value) {
        previous = headAux;
        headAux = headAux.getNext();
        }
        if (!previous) {
        this.head = headAux.getNext();
        }
        else {
        previous.setNext(headAux.getNext());
        }
        return headAux.getValue();
    }

    public search(value: T): MyNode<T> {
        let headAux = this.head;
        while (headAux && headAux.getValue() !== value) {
        headAux = headAux.getNext();
        }
        return headAux;
    }

    public sort(): void {
        let value: T;
        const listAux = new List<T>();
        while (this.head) {
        value = this.removeFirst();
        listAux.insertOrdered(value);
        }
        this.head = listAux.head;
        listAux.clear();
    }

    public clear(): void {
        while (this.head) {
        this.removeFirst();
        }
    }
}