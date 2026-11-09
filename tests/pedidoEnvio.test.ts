import {beforeEach, afterEach, describe, expect, test} from "@jest/globals";
import {PedidoEnvio} from "../src/pedidos/pedidoEnvio";
import {Item} from "../src/item"
describe("Prueba de la clase pedidoEnvio", () => {

    let instance:PedidoEnvio;

    beforeEach(()=> {
        instance = new PedidoEnvio("Libertador");
    });

    afterEach(()=> {});



    test("Debe ser instancia de la clase Pedido", ()=>{
        expect(instance).toBeInstanceOf(PedidoEnvio);
    });

    test("Debe devolver `Libertador` como direccion de envio", ()=>{
        expect(instance.getDireccion()).toEqual("Libertador");
    });

    test("Debe devolver 100 como precio de costo de envio", ()=>{
        instance.setCostoEnvio(100);
        let result = instance.getCostoEnvio();
        expect(result).toEqual(100);
    });

    test("Debe devolver los cargos adicionales por costo de envio", ()=> {
        instance.setCostoEnvio(50);
        let result = instance.getCargosAdicionales();
        expect(result).toEqual(50);
    })

    test("Debe devolver true", ()=> {
        expect(instance.puedeModificarse()).toBe(true);
    })

    // test("Debe devolver el nombre del item", ()=>{
    //     let hamburguesa = new Item("hamburguesa", 100)
    //     let itemPedido = new ItemPedido("Hamburguesa", 2)
    // })
});