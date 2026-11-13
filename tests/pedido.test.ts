import {beforeEach, describe, expect, test} from "@jest/globals";
import {Pedido} from "../src/pedidos/pedido";
import {EstadoPedido} from "../src/estadoPedido";
import {EstadoItem} from "../src/estadoItem";
import {Categoria} from "../src/categoria";
import {TipoEstacion} from "../src/cocina/tipoEstacion";
import {ItemIndividual} from "../src/itemIndividual";
import {ItemPedido} from "../src/itemPedido";
import {EnPreparacion} from "../src/cocina/enPreparacion";
import {Listo} from "../src/cocina/listo";
import {ErrorEnPedido} from "../src/Errores/errorEnPedido";

class PedidoTest extends Pedido {}


describe("Tests de la clase abstracta Pedido", () => {
    let instance: PedidoTest;

    beforeEach(() => {
        instance = new PedidoTest();
    });

    test("Se instancia correctamente y comienza en construccion", () => {
        expect(instance).toBeInstanceOf(Pedido);
        expect(instance.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
        expect(instance.puedeModificarse()).toBe(true);
        expect(instance.getPrecioFinal()).toBe(0);
        expect(instance.getItems().getHead()).toBeUndefined();
    });

    test("Permite asignar y obtener su id", () => {
        instance.setID(12);
        expect(instance.getID()).toBe(12);
    });

    test("Registra la fecha de creacion", () => {
        expect(instance.getFecha()).toBeInstanceOf(Date);
    });

    test("Agrega un item y actualiza el precio final", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);

        expect(instance.getItems().search(itemPedido)).toBe(true);
        expect(instance.getPrecioFinal()).toBe(200);
    });

    test("Elimina un item y recalcula el precio final", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);

        instance.eliminarItem(itemPedido);

        expect(instance.getItems().getHead()).toBeUndefined();
        expect(instance.getPrecioFinal()).toBe(0);
    });

    test("No permite agregar items cuando el pedido esta confirmado", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.setEstado(EstadoPedido.CONFIRMADO);

        expect(() => instance.agregarItem(itemPedido)).toThrow(ErrorEnPedido);
    });

    test("No permite eliminar items cuando el pedido esta confirmado", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);
        instance.setEstado(EstadoPedido.CONFIRMADO);

        expect(() => instance.eliminarItem(itemPedido)).toThrow(ErrorEnPedido);
    });

    test("No permite eliminar un item que esta en preparacion", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);
        itemPedido.setEstado(new EnPreparacion());

        expect(() => instance.eliminarItem(itemPedido)).toThrow(ErrorEnPedido);
    });

    test("Deshace la ultima modificacion de agregado", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);

        instance.deshacerUltimaModificacion();

        expect(instance.getItems().getHead()).toBeUndefined();
        expect(instance.getPrecioFinal()).toBe(0);
    });

    test("Deshace la ultima modificacion de eliminacion", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);
        instance.eliminarItem(itemPedido);

        instance.deshacerUltimaModificacion();

        expect(instance.getItems().getHead()?.getValue()).toBe(itemPedido);
        expect(instance.getPrecioFinal()).toBe(200);
    });

    test("No permite deshacer si no hay modificaciones", () => {
        expect(() => instance.deshacerUltimaModificacion()).toThrow(ErrorEnPedido);
    });

    test("No permite deshacer modificaciones si el pedido esta confirmado", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);
        instance.setEstado(EstadoPedido.CONFIRMADO);

        expect(() => instance.deshacerUltimaModificacion()).toThrow(ErrorEnPedido);
    });

    test("Puede facturarse unicamente cuando esta confirmado", () => {
        expect(instance.puedeFacturar()).toBe(false);

        instance.setEstado(EstadoPedido.CONFIRMADO);
        expect(instance.puedeFacturar()).toBe(true);

        instance.setEstado(EstadoPedido.FACTURADO);
        expect(instance.puedeFacturar()).toBe(false);
    });

    test("No esta listo para facturar si esta vacío", () => {
        instance.setEstado(EstadoPedido.CONFIRMADO);

        expect(instance.listoParaFacturar()).toBe(false);
    });

    test("No esta listo para facturar si algun item no esta listo", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);
        instance.setEstado(EstadoPedido.CONFIRMADO);

        expect(instance.listoParaFacturar()).toBe(false);
    });

    test("Esta listo para facturar cuando esta confirmado y todos sus items estan listos", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);
        itemPedido.setEstado(new Listo());
        instance.setEstado(EstadoPedido.CONFIRMADO);

        expect(itemPedido.getEstado()).toBe(EstadoItem.LISTO);
        expect(instance.listoParaFacturar()).toBe(true);
    });

    test("No esta listo para facturar si todos los items están listos pero el pedido no esta confirmado", () => {
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 2);
        hamburguesa.setPrecio(100);
        instance.agregarItem(itemPedido);
        itemPedido.setEstado(new Listo());

        expect(instance.listoParaFacturar()).toBe(false);
    });

});
