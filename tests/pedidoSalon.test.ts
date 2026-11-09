import {beforeEach, afterEach, describe, expect, test} from "@jest/globals";
import {PedidoSalon} from "../src/pedidos/pedidoSalon"
describe("Prueba de la clase PedidoSalon", () => {

    let instance:PedidoSalon;

    beforeEach(() => {
        instance = new PedidoSalon(2)
    });

    afterEach(() => { });

    test("Debe devolver la mesa 2", () => {
        expect(instance.getNumeroMesa()).toEqual(2);
    });

    test("Debe devolver la mesa 7", () => {
        instance.setNumeroMesa(7);
        expect(instance.getNumeroMesa()).toEqual(7);
    })
})