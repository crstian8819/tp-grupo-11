import {beforeEach, describe, expect, jest, test} from "@jest/globals";
import {GestorPedidos} from "../src/pedidos/gestorPedidos";
import {Pedido} from "../src/pedidos/pedido";
import {PedidoSalon} from "../src/pedidos/pedidoSalon";
import {PedidoRetirar} from "../src/pedidos/pedidoRetirar";
import {PedidoEnvio} from "../src/pedidos/pedidoEnvio";
import {EstadoPedido} from "../src/estadoPedido";
import {Categoria} from "../src/categoria";
import {TipoEstacion} from "../src/cocina/tipoEstacion";
import {ItemIndividual} from "../src/itemIndividual";
import {ItemPedido} from "../src/itemPedido";
import {DistribuirItem} from "../src/cocina/distribuirItem";
import {Factura} from "../src/GestorPagos/factura";
import {ErrorEnConfirmacion} from "../src/Errores/errorEnConfirmacion";
import {ErrorEnHistorial} from "../src/Errores/errorEnHistorial";
import {Parrilla} from "../src/cocina/parrilla";


describe("Tests de GestorPedidos", () => {
    let gestor: GestorPedidos;

    beforeEach(() => {
        gestor = new GestorPedidos();
    });

    test("Crea y registra un pedido de salon con ID inicial 0", () => {
        const pedido = gestor.crearPedidoSalon(5);

        expect(pedido).toBeInstanceOf(PedidoSalon); 
        expect((pedido as PedidoSalon).getNumeroMesa()).toBe(5); //Casteado porque me daba error la funcion sino
        expect(pedido.getID()).toBe(0);
        expect(gestor.getPedidoPorId(0)).toBe(pedido);
    });

    test("Crea pedidos de distintas modalidades y asigna ids consecutivos", () => {
        const salon = gestor.crearPedidoSalon(2);
        const retirar = gestor.crearPedidoRetirar(2030);
        const envio = gestor.crearPedidoEnvio("Hola 123");

        expect(retirar).toBeInstanceOf(PedidoRetirar);
        expect((retirar as PedidoRetirar).getHorario()).toBe(2030);
        expect(envio).toBeInstanceOf(PedidoEnvio);
        expect((envio as PedidoEnvio).getDireccion()).toBe("Hola 123");
        expect(salon.getID()).toBe(0);
        expect(retirar.getID()).toBe(1);
        expect(envio.getID()).toBe(2);
        expect(gestor.getPedidoPorId(0)).toBe(salon);
        expect(gestor.getPedidoPorId(1)).toBe(retirar);
        expect(gestor.getPedidoPorId(2)).toBe(envio);
    });

    test("Devuelve undefined cuando no existe un pedido con ese id", () => {
        expect(gestor.getPedidoPorId(99)).toBeUndefined();
    });


    test("No permite confirmar un pedido vacio", () => {
        const pedido = gestor.crearPedidoSalon(1);

        const parrilla = new Parrilla();
        const distribuidor = new DistribuirItem(parrilla);

        expect(() => gestor.confirmarPedido(pedido, distribuidor)).toThrow(ErrorEnConfirmacion);

        expect(parrilla.getItems()).toHaveLength(0);
        expect(pedido.getEstado()).toBe(EstadoPedido.EN_CONSTRUCCION);
    });

    test("Confirma un pedido con items y los envia al distribuidor", () => {
        const pedido = gestor.crearPedidoSalon(1);
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const itemPedido = new ItemPedido(hamburguesa, 1);

        pedido.agregarItem(itemPedido);

        const parrilla = new Parrilla();
        const distribuidor = new DistribuirItem(parrilla);

        gestor.confirmarPedido(pedido, distribuidor);

        expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
        expect(parrilla.getItems().length).toBe(1);
        expect(parrilla.getItems()[0].getProducto()).toBe(hamburguesa);
    });


    test("Distribuye todos los items registrados en el pedido", () => {
        const pedido = gestor.crearPedidoSalon(1);
        const hamburguesa = new ItemIndividual("hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);

        hamburguesa.setPrecio(100);

        const primero = new ItemPedido(hamburguesa, 2);
        const pizza = new ItemIndividual("pizza", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);

        pizza.setPrecio(200);

        const segundo = new ItemPedido(pizza, 2);

        pedido.agregarItem(primero);
        pedido.agregarItem(segundo);

        const parrilla = new Parrilla();
        const distribuidor = new DistribuirItem(parrilla);

        gestor.distribuirItemsACocina(pedido, distribuidor);

        expect(parrilla.getItems()).toHaveLength(4);
    });

    test("Registra facturas con ids consecutivos", () => {
        const pedidoUno = gestor.crearPedidoSalon(1);
        const pedidoDos = gestor.crearPedidoSalon(2);
        const facturaUno = new Factura(pedidoUno, 100);
        const facturaDos = new Factura(pedidoDos, 200);

        gestor.registrarPedidoFinalizado(facturaUno);
        gestor.registrarPedidoFinalizado(facturaDos);

        expect(facturaUno.getIdFactura()).toBe(0);
        expect(facturaDos.getIdFactura()).toBe(1);
        expect(gestor.getPedidosFinalizados().get(0)).toBe(facturaUno);
        expect(gestor.getPedidosFinalizados().get(1)).toBe(facturaDos);
    });

    test("No permite consultar un historial vacio", () => {
        expect(() => gestor.consultarHistorial()).toThrow(ErrorEnHistorial);
    });

    test("Devuelve todas las facturas registradas en el historial", () => {
        const pedidoUno = gestor.crearPedidoSalon(1);
        const pedidoDos = gestor.crearPedidoSalon(2);
        const facturaUno = new Factura(pedidoUno, 100);
        const facturaDos = new Factura(pedidoDos, 200);

        gestor.registrarPedidoFinalizado(facturaUno);
        gestor.registrarPedidoFinalizado(facturaDos);

        expect(gestor.consultarHistorial()).toEqual([facturaUno, facturaDos]);
    });
});
