import {ItemIndividual} from "../src/itemIndividual";
import {beforeEach, afterEach, describe, expect, test} from "@jest/globals"

describe("Prueba de la clase ItemIndividual", () => {

    let instance:ItemIndividual;

    beforeEach(()=> {
        instance = new ItemIndividual();
    });

    afterEach(()=> {});

    test("Debe ser instancia de la clase Pedido", ()=>{
        expect(instance).toBeInstanceOf(ItemIndividual);
    });

    test("Debe guardar y devolver el nombre de la instancia", ()=>{
        instance.setNombre("Pizza");
        const result = instance.getNombre();
        expect(result).toBe("Pizza");
    });

});