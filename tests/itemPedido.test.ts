import {ItemPedido} from "../src/itemPedido";
import {beforeEach, afterEach, describe, expect, test} from "@jest/globals"

describe("Prueba de la clase ItemPedido", () => {

    let instance:ItemPedido;

    beforeEach(()=> {
        instance = new ItemPedido();
    });

    afterEach(()=> {});

    test("Debe ser instancia de la clase Pedido", ()=>{
        expect(instance).toBeInstanceOf(ItemPedido);
    });

    test("Debe guardar y devolver el nombre de la instancia", ()=>{
        instance.setNombre("Pizza");
        const result = instance.getNombre();
        expect(result).toBe("Pizza");
    });

});