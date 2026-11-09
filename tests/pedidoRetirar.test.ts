import {beforeEach, afterEach, describe, expect, test} from "@jest/globals";
import {PedidoRetirar} from "../src/pedidos/pedidoRetirar"
describe("Prueba de la clase PedidoRetirar", () => {

    let instance:PedidoRetirar;

    beforeEach(() => {
        instance = new PedidoRetirar(22)
    });

    afterEach(() => { });

    test("Debe devolver el horario 22", () => {
        expect(instance.getHorario()).toEqual(22);
    });

    test("Debe devolver el horario cambiado a 15", () => {
        instance.setHorario(15);
        expect(instance.getHorario()).toEqual(15);
    });
})