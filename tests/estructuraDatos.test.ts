import {beforeEach, describe, expect, test} from "@jest/globals"
import { List } from "../src/estructuraDatos/listaEnlazada";
import { MyNode } from "../src/estructuraDatos/node";

describe("Pruebas Unitarias - Estructura de Datos (List y MyNode)", () => {
    let lista: List<number>;

    beforeEach(() => {
        lista = new List<number>();
    });

    test("MyNode: debe permitir asignar el siguiente nodo con setNext", () => {
        const nodo1 = new MyNode(10);
        const nodo2 = new MyNode(20);

        nodo1.setNext(nodo2);

        expect(nodo1.getNext()).toBe(nodo2);
    });

    test("ListaEnlazada: insertFirst, removeFirst y removeLast", () => {
        lista.push(10);
        lista.insertFirst(5); //Lista: 5, 10

        expect(lista.getHead()?.getValue()).toBe(5);

        const eliminadoPrimero = lista.removeLast();
        
        expect(eliminadoPrimero).toBe(10);
    });

    test("ListaEnlazada: delete, clear y search", () => {
        lista.push(1);
        lista.push(2);
        lista.push(3);
        
        expect(lista.search(2)).toBe(true);

        const eliminado = lista.delete(2);
        expect(eliminado).toBe(2); //Verifica que devuelva el elemento borrado.
        expect(lista.search(2)).toBe(false);

        lista.clear();
        expect(lista.getHead()).toBeUndefined();
    });

    test("ListaEnlazada: insertOrdered y sort", () => {
        lista.push(30);
        lista.push(10);
        lista.push(20);

        lista.sort();

        expect(lista.getHead()?.getValue()).toBe(10);

        lista.insertOrdered(15);
        expect(lista.search(15)).toBe(true);
    });
});