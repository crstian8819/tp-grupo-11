import {beforeEach, afterEach, describe, expect, test} from "@jest/globals"
import {Pedido} from "../src/pedidos/pedido"
import { EstadoPedido } from "../src/estadoPedido";
import { Categoria } from "../src/categoria";
import { TipoEstacion } from "../src/cocina/tipoEstacion";
import { ItemIndividual } from "../src/itemIndividual";
import { ItemPedido } from "../src/itemPedido";

class PedidoTest extends Pedido{ }

describe("Tests de la clase abstracta Pedido", () => {
    let instance: PedidoTest;

    beforeEach(() => {
        instance = new PedidoTest()
    });

    afterEach(() => {} );

    test("Debe ser instancia de la clase pedido", ()=>{
        expect(instance).toBeInstanceOf(Pedido);
    });

    test("Debe devolver true", ()=> {
        expect(instance.puedeModificarse()).toBe(true);
    });

    test("Debe devolver false", () => {
        instance.setEstado(EstadoPedido.CONFIRMADO)
        expect(instance.puedeModificarse()).toBe(false);
    });

    test("Debe devolver true, si se encuentra el item", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        expect(instance.getItems().search(itemPedido)).toBe(true);
    })
});