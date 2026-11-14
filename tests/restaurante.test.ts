import {beforeEach, describe, expect, test} from "@jest/globals"
import { Restaurante } from "../src/restaurante";
import { ItemIndividual } from "../src/itemIndividual";
import { ItemPedido } from "../src/itemPedido";
import { Categoria } from "../src/categoria";
import { TipoEstacion } from "../src/cocina/tipoEstacion";
import { Parrilla } from "../src/cocina/parrilla";
import { Barra } from "../src/cocina/barra";
import { CocinaFria } from "../src/cocina/cocinaFria";
import { CocinaDulce } from "../src/cocina/cocinaDulce";
import { MedioPago } from "../src/GestorPagos/medioPago";
import { TipoMedioPago } from "../src/GestorPagos/tipoMedioPago";
import { DescuentoDia } from "../src/GestorPagos/descuentoDia";
import { DiaSemana } from "../src/GestorPagos/diaSemana";
import { EstadoPedido } from "../src/estadoPedido";
import { Factura } from "../src/GestorPagos/factura";
import { ErrorEnCocina } from "../src/Errores/errorEnCocina";
import { PedidoSalon } from "../src/pedidos/pedidoSalon";
import { PedidoEnvio } from "../src/pedidos/pedidoEnvio";
import { PedidoRetirar } from "../src/pedidos/pedidoRetirar";

//Subclase concreta para probar MedioPago
class MedioPagoTest extends MedioPago {
    constructor(tipoPago: TipoMedioPago) {
        super(tipoPago);
    }
}

describe("Pruebas Unitarias - Restaurante", () => {
    let restaurante: Restaurante;
    let parrilla: Parrilla;
    let barra: Barra;
    let cocinaFria: CocinaFria;
    let cocinaDulce: CocinaDulce;

    beforeEach(() => {
        //Inicialización del Restaurante y estaciones de Cocina
        restaurante = new Restaurante();
        parrilla = new Parrilla();
        barra = new Barra();
        cocinaFria = new CocinaFria();
        cocinaDulce = new CocinaDulce();
    });

    describe("Inicialización y acceso a subsistemas", () => {
        test("Debe inicializar correctamente los subsistemas Menu, GestorPedidos y GestorPagos", () => {
            expect(restaurante.getMenu()).toBeDefined();
            expect(restaurante.getGestorPedidos()).toBeDefined();
            expect(restaurante.getGestorPagos()).toBeDefined();
            expect(restaurante.getCocinas()).toHaveLength(0);
        });

        test("Debe agregar cocinas y encadenarlas automáticamente", () => {
            restaurante.agregarCocina(parrilla);
            restaurante.agregarCocina(barra);
            const cocinas = restaurante.getCocinas();

            expect(cocinas).toHaveLength(2);
            expect(cocinas[0]).toBe(parrilla);
            expect(cocinas[1]).toBe(barra);

            cocinas.pop();
            expect(restaurante.getCocinas()).toHaveLength(2);
        });

        test("Debe delegar la configuración de descuento al GestorPagos", () => {
            const descuentoDia = new DescuentoDia(DiaSemana.VIERNES, 0.85);
            restaurante.configurarDescuentoDelDia(descuentoDia);
            restaurante.configurarDescuentoEnEfectivo(0.8);
            const gestorPagos = restaurante.getGestorPagos();
            
            expect(gestorPagos.getDescuentoDelDia()).toBe(descuentoDia);
            expect(gestorPagos.getDescuentoEnEfectivo()).toBe(0.8);
        });
    });

    describe("Apertura de pedidos", () => {
        test("Debe permitir abrir pedidos de distintas modalidades (Salón, Retirar, Envío)", () => {
            const pedidoSalon = restaurante.abrirPedidoSalon(4);
            const pedidoRetirar = restaurante.abrirPedidoRetirar(2030);
            const pedidoEnvio = restaurante.abrirPedidoEnvio("Av. Maipu 900");

            expect(pedidoSalon).toBeInstanceOf(PedidoSalon);
            expect(pedidoRetirar).toBeInstanceOf(PedidoRetirar);
            expect(pedidoEnvio).toBeInstanceOf(PedidoEnvio);

            expect(pedidoSalon.getID()).toBe(0);
            expect(pedidoRetirar.getID()).toBe(1);
            expect(pedidoEnvio.getID()).toBe(2);
        });
    });

    describe("Confirmación y Distribución de Pedidos", () => {
        test("Debe lanzar ErrorEnCocina al intentar confirmar un pedido sin estaciones de cocina registradas", () => {
            const pedido = restaurante.abrirPedidoSalon(1);
            const hamburguesa = new ItemIndividual("Hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
            pedido.agregarItem(new ItemPedido(hamburguesa, 1));

            expect(() => {
                restaurante.confirmarPedido(pedido.getID());
            }).toThrow(ErrorEnCocina);
        });

        test("Debe lanzar Error si el ID del pedido a confirmar no existe", () => {
            restaurante.agregarCocina(parrilla);

            expect(() => {
                restaurante.confirmarPedido(666);
            }).toThrow("El pedido con ID 666 no existe.");
        });

        test("Debe confirmar un pedido válido y distribuir sus ítems a las cocinas correspondientes", () => {
            //Registro de la cadena completa de cocinas
            restaurante.agregarCocina(parrilla);
            restaurante.agregarCocina(barra);
            restaurante.agregarCocina(cocinaFria);
            restaurante.agregarCocina(cocinaDulce);

            const pedido = restaurante.abrirPedidoSalon(1);
            const pizza = new ItemIndividual("Muzza", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
            const cerveza = new ItemIndividual("IPA", Categoria.BEBIDA, TipoEstacion.BARRA);
            
            pedido.agregarItem(new ItemPedido(pizza, 1));
            pedido.agregarItem(new ItemPedido(cerveza, 2));

            restaurante.confirmarPedido(pedido.getID());

            expect(pedido.getEstado()).toBe(EstadoPedido.CONFIRMADO);
            expect(parrilla.getItems()).toHaveLength(1);
            expect(barra.getItems()).toHaveLength(2);
        });
    });

    describe("Facturación e Historial de Ventas", () => {
        test("Debe lanzar Error si se intenta cobrar un pedido inexistente", () => {
            const medioPago = new MedioPagoTest(TipoMedioPago.EFECTIVO);
            expect(() => {
                restaurante.cobrarPedido(666, medioPago);
            }).toThrow("El pedido con ID 666 no existe.");
        });

        test("Debe ejecutar la facturación completa, cambiar el estado del pedido y registrar la venta en le historial", () => {
           //Preparación del sistema y las cocinas
           restaurante.agregarCocina(parrilla);
           restaurante.agregarCocina(barra);
           restaurante.agregarCocina(cocinaDulce);
           restaurante.agregarCocina(cocinaFria);

           restaurante.configurarDescuentoEnEfectivo(0.9); //10%
           
           const pedido = restaurante.abrirPedidoSalon(3);
           const hamburguesa = new ItemIndividual("Hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
           hamburguesa.setPrecio(5000);

           const itemPedido = new ItemPedido(hamburguesa, 1);
           pedido.agregarItem(itemPedido);

           restaurante.confirmarPedido(pedido.getID());

           const subPreparacion = parrilla.getItems()[0];
           subPreparacion.avanzarEstado(); //PENDIENTE -> EN_PREPARACIÓN 
           subPreparacion.avanzarEstado(); //EN_PREPARACIÓN -> LISTO
           
           const medioPago = new MedioPagoTest(TipoMedioPago.EFECTIVO);

           const factura = restaurante.cobrarPedido(pedido.getID(), medioPago);

           expect(factura).toBeInstanceOf(Factura);
           expect(factura.getMontoFinal()).toBe(4500); // 5000 * 0.9 = 4500
           expect(pedido.getEstado()).toBe(EstadoPedido.FACTURADO);

           const historial = restaurante.consultarHistorialVentas();
           expect(historial).toHaveLength(1);
           expect(historial[0]).toBe(factura);
        });
    });
});