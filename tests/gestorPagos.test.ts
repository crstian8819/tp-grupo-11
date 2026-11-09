import {beforeEach, afterEach, describe, expect, test, jest} from "@jest/globals"
import { MedioPago } from "../src/GestorPagos/medioPago";
import { TipoMedioPago } from "../src/GestorPagos/tipoMedioPago";
import { DescuentoDia } from "../src/GestorPagos/descuentoDia";
import { Factura } from "../src/GestorPagos/factura";
//import { Pedido } from "../src/pedidos/pedido"; 
//import { DescuentoBeneficioso } from "../src/GestorPagos/descuento";
import { EstadoPedido } from "../src/estadoPedido"
import { ErrorEnFacturacion } from "../src/Errores/errorEnFacturacion";
import { NUM_DOS, UNIDAD } from "../src/Constantes/constantes";
import { GestorPedidos } from "../src/pedidos/gestorPedidos";
import { PedidoSalon } from "../src/pedidos/pedidoSalon";
import { ItemIndividual } from "../src/itemIndividual";
import { ItemPedido } from "../src/itemPedido";
import { GestorPagos } from "../src/GestorPagos/gestorPagos";
import { Categoria } from "../src/categoria";
import { TipoEstacion } from "../src/cocina/tipoEstacion";
import { DiaSemana } from "../src/GestorPagos/diaSemana";

class MedioPagoTest extends MedioPago {
    constructor(tipoPago: TipoMedioPago) {
        super(tipoPago);
    }
}
const NUM_MIL:number = 1000;
const NUM_MIL_OCHOCIENTOS:number = 1800;
const NUM_SIETE:number = 7;
const DIEZ_PORCIENTO:number = 0.9;
const QUINCE_PORCIENTO:number = 0.85;
const VEINTE_PORCIENTO:number = 0.8;

describe("Pruebas Unitarias - GestorPagos", () => {
    let gestorPedidos: GestorPedidos;
    let gestorPagos: GestorPagos;
    let pedido: PedidoSalon;
    let itemIndividual: ItemIndividual;
    let itemPedido: ItemPedido;

    beforeEach(() => {
        //Inicialización para garantizar la independencia de los tests.
        gestorPedidos = new GestorPedidos();
        gestorPagos = new GestorPagos(gestorPedidos);
        
        //Creación de un pedido de salón válido.
        pedido = new PedidoSalon(UNIDAD);

        //Creación de producto e ítem de pedido para armar un pedido con precio.
        itemIndividual = new ItemIndividual("Hamburguesa", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        itemIndividual.setPrecio(NUM_MIL);
        itemPedido = new ItemPedido(itemIndividual, NUM_DOS); //Total Precio = 2000
        pedido.agregarItem(itemPedido);
    });

    describe("Método: calcularDescuento", () => {
        test("Debe retornar factor 1 (sin descuento) si el medio de pago no es efectivo y no hay descuento del dia", () => {
            //ARRANGE (Preparativo)
            const medioPagoTargeta = new MedioPagoTest(TipoMedioPago.TARJETA);
            gestorPagos.setMedioPago(medioPagoTargeta);

            //ACT (Ejecución)
            const factorDescuento = gestorPagos.calcularDescuento(pedido);

            //ASSERT (Verificación)
            expect(factorDescuento).toBe(UNIDAD);
        });

        test("Debe aplicar el descuento en efectivo si el medio de pago es EFECTIVO", () => {
            const medioPagoEfectivo = new MedioPagoTest(TipoMedioPago.EFECTIVO);
            gestorPagos.setMedioPago(medioPagoEfectivo);
            gestorPagos.setDescuentoEnEfectivo(QUINCE_PORCIENTO); //0.85 = 15% descuento
        
            const factorDescuento = gestorPagos.calcularDescuento(pedido);

            expect(factorDescuento).toBe(QUINCE_PORCIENTO);
        });

        test("Debe aplicar el descuento del día cuando el día del pedido coincide con la promoción", () => {
            const diaActual: DiaSemana = pedido.getFecha().getDay();
            const descuentoPromocional = new DescuentoDia(diaActual, VEINTE_PORCIENTO); //0.8 = 20% descuento
            gestorPagos.setDescuentoDelDia(descuentoPromocional);

            const factorDescuento = gestorPagos.calcularDescuento(pedido);

            expect(factorDescuento).toBe(VEINTE_PORCIENTO);
        });

        test("No debe aplicar el descuento del día si la fecha del pedido no coincide con el día del descuento", () => {
            const diaPedido = pedido.getFecha().getDay();
            const diaDiferente: DiaSemana = (diaPedido + UNIDAD) % NUM_SIETE; //Selecciona un dia distinto al del pedido
            const descuentoPromocional = new DescuentoDia(diaDiferente, VEINTE_PORCIENTO);
            gestorPagos.setDescuentoDelDia(descuentoPromocional);

            const factorDescuento = gestorPagos.calcularDescuento(pedido);

            expect(factorDescuento).toBe(UNIDAD);
        });

        test("Debe seleccionar el MEJOR descuento (menor multiplicador) entre efectivo y el descuento del dia", () => {
            const medioPagoEfectivo = new MedioPagoTest(TipoMedioPago.EFECTIVO);
            gestorPagos.setMedioPago(medioPagoEfectivo);
            gestorPagos.setDescuentoEnEfectivo(DIEZ_PORCIENTO); //0.9 = 10% descuento
            const diaActual: DiaSemana = pedido.getFecha().getDay();
            const descuentoPromocional = new DescuentoDia(diaActual, VEINTE_PORCIENTO); //0.8 = 20% descuento
            gestorPagos.setDescuentoDelDia(descuentoPromocional);

            const factorDescuento = gestorPagos.calcularDescuento(pedido);

            //Verificación - Math.min(0.9, 0.8) => 0.8 (Mayor beneficio para el cliente).
            expect(factorDescuento).toBe(VEINTE_PORCIENTO);
        });
    });
    
    describe("Método: cobrar", () => {
        test("Debe lanzar ErrorEnFacturacion si el pedido no se encuentra LISTO PARA FACTURAR", () => {
            //El pedido se encuentra en estado EN_CONSTRUCCION por default.
            const medioPago = new MedioPagoTest(TipoMedioPago.EFECTIVO);
            gestorPagos.setMedioPago(medioPago);

            expect(() => { gestorPagos.cobrar(pedido); }).toThrow("El pedido no se encuentra LISTO PARA FACTURAR.");
        });

        test("Debe lanzar ErrorEnFacturacion si no se configuró un medio de pago", () => {
            //Preparación del pedido para que esté listo para facturar.
            pedido.setEstado(EstadoPedido.CONFIRMADO);
            itemPedido.avanzarEstado(); //PENDIENTE -> EN_PREPARACION
            itemPedido.avanzarEstado(); //EN_PREPARACION -> LISTO
            //medioPago no está asignado
            expect(() => {gestorPagos.cobrar(pedido);}).toThrow(ErrorEnFacturacion);
            expect(() => {gestorPagos.cobrar(pedido);}).toThrow("No hay medio de pago.");
        });

        test("Debe cobrar exitosamente, cambiar el estado del pedido a FACTURADO y registrar la factura en GestorPedidos", () => {
            const medioPago = new MedioPagoTest(TipoMedioPago.EFECTIVO);
            gestorPagos.setMedioPago(medioPago);
            gestorPagos.setDescuentoEnEfectivo(DIEZ_PORCIENTO);
            //Preparación del pedido
            pedido.setEstado(EstadoPedido.CONFIRMADO);
            itemPedido.avanzarEstado(); //EN_PREPARACION
            itemPedido.avanzarEstado(); //LISTO
            //Spy sobre gestorPedidos para verificar interacción
            const spyRegistrarPedido = jest.spyOn(gestorPedidos, "registrarPedidoFinalizado");
            const facturaGenerada = gestorPagos.cobrar(pedido);


            expect(facturaGenerada).toBeDefined();
            expect(facturaGenerada).toBeInstanceOf(Factura);
            expect(facturaGenerada?.getMontoFinal()).toBe(NUM_MIL_OCHOCIENTOS);
            expect(pedido.getEstado()).toBe(EstadoPedido.FACTURADO);

            expect(spyRegistrarPedido).toHaveBeenCalledTimes(UNIDAD);
            if (!facturaGenerada) {
                throw new Error("No se generó la factura");
            }
            expect(spyRegistrarPedido).toHaveBeenCalledWith(facturaGenerada);
        });

    });

    
    
    afterEach(() => {});

    test("Verifica instancia GestorPedidos", () => {
        expect(gestorPedidos).toBeInstanceOf(GestorPedidos);
    });

    test("Verifica instancia GestorPagos", () => {
        expect(gestorPagos).toBeInstanceOf(GestorPagos);
    });

});