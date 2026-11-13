import {beforeEach, afterEach, describe, expect, test, jest} from "@jest/globals"
import { Combo } from "../src/combo";
import { ItemIndividual } from "../src/itemIndividual";
import { Categoria } from "../src/categoria";
import { TipoEstacion } from "../src/cocina/tipoEstacion";
import { PrecioFijo } from "../src/precioFijo";
import { DescuentoPorcentual } from "../src/descuentoPorcentual";
import { ErrorEnCombo } from "../src/Errores/errorEnCombo";
import { ErrorEnDescuento } from "../src/Errores/errorEnDescuento";

describe("Pruebas Unitarias - Combo y Estrategias de Beneficio", () => {
    let hamburguesa: ItemIndividual;
    let gaseosa: ItemIndividual;
    let papasFritas: ItemIndividual;

    beforeEach(() => {
        //Inicialización de productos individuales para armar combos
        hamburguesa = new ItemIndividual("Hamburguesa Doble", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        hamburguesa.setPrecio(1200);

        gaseosa = new ItemIndividual("Gaseosa 500ml", Categoria.BEBIDA, TipoEstacion.BARRA);
        gaseosa.setPrecio(400);
        papasFritas = new ItemIndividual("Papas Fritas", Categoria.ENTRADA, TipoEstacion.COCINA_FRIA);
        papasFritas.setPrecio(500);
    });

    describe("Constructor y Validaciones de Combo", () => {
        test("Debe instanciar un Combo correctamente cuando se proporcionan 2 o más productos", () => {
            const productos = [hamburguesa, gaseosa];
            const beneficio = new PrecioFijo(1400);

            const combo = new Combo("Combo Clásico", productos, beneficio);

            expect(combo).toBeDefined();
            expect(combo.getNombre()).toBe("Combo Clásico");
            expect(combo.getComponentes().length).toBe(2);
        });

        test("Debe lanzar ErrorEnCombo si se intenta crear un combo con menos de 2 productos", () => {
            const productosInsuficientes = [hamburguesa];
            const beneficio = new PrecioFijo(1000);

            expect(() => {
                new Combo("Combo Invalido", productosInsuficientes, beneficio);
            }).toThrow(ErrorEnCombo);

            expect(() => {
                new Combo("Combo Invalido", productosInsuficientes, beneficio);
            }).toThrow("Un combo debe tener al menos 2 productos");
        });

        test("Debe lanzar ErrorEnCombo si se intenta crear un combo con un arreglo vacío de productos", () => {
            const productosVacios: ItemIndividual[] = [];
            const beneficio = new PrecioFijo(500);

            expect(() => {
                new Combo("Combo Vacío", productosVacios, beneficio);
            }).toThrow(ErrorEnCombo);
        });
    });

    describe("Calculo de Precios con Estrategias de Beneficio", () => {
        test("Debe calcular correctamente el precio del combo utilizando la estrategia PrecioFijo", () => {
            const productos = [hamburguesa, gaseosa, papasFritas]; //Suma = 2100
            const precioPromocional = 1500;
            const beneficioFijo = new PrecioFijo(precioPromocional);
            const combo = new Combo("Combo Familiar", productos, beneficioFijo);

            combo.setPrecio();

            expect(combo.getPrecio()).toBe(1500);
        });

        test("Debe calcular correctamente el precio del combo utilizando la estrategia DescuentoPorcentual", () => {
            //hamburguesa (1200) + gaseosa (400) = 1600
            //descuento del 20% = 0.8 -> Total esperado = 1600 * 0.8 = 1280
            const productos = [hamburguesa, gaseosa];
            const beneficioPorcentual = new DescuentoPorcentual(0.8);
            const combo = new Combo("Combo Promo del 20%", productos, beneficioPorcentual);

            combo.setPrecio();

            expect(combo.getPrecio()).toBe(1280);
        });
    });

    describe("Validaciones de las Estrategias de Beneficio", () => {
        test("PrecioFijo debe lanzar ErrorEnDescuento si el precio es negativo", () => {
            expect(() => {
                new PrecioFijo(-500);
            }).toThrow(ErrorEnDescuento);

            expect(() => {
                new PrecioFijo(-500);
            }).toThrow("El precio fijo no puede ser negativo");
        });

        test("DescuentoPorcentual debe lanzar ErrorEnDescuento si el porcentaje es menor a 0", () => {
            expect(() => {
                new DescuentoPorcentual(-0.1);
            }).toThrow(ErrorEnDescuento);

            expect(() => {
                new DescuentoPorcentual(-0.1);
            }).toThrow("El descuento debe estar entre 0 y 1");
        });

        test("DescuentoPorcentual debe lanzar ErrorEnDescuento si el porcentaje es mayor a 1", () => {
            expect(() => {
                new DescuentoPorcentual(1.2);
            }).toThrow(ErrorEnDescuento);

            expect(() => {
                new DescuentoPorcentual(1.2);
            }).toThrow("El descuento debe estar entre 0 y 1");
        });
    });

    describe("Obteneción de Componentes", () => {
        test("getComponentes debe devolver todos los ítems componentes del combo", () => {
            const productos = [hamburguesa, papasFritas];
            const combo = new Combo("Combo Simple", productos, new PrecioFijo(1000));

            const componentes = combo.getComponentes();

            expect(componentes).toEqual([hamburguesa, papasFritas]);
            expect(componentes.length).toBe(2);
        });
    });
});