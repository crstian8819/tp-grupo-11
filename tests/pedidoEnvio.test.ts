import {beforeEach, afterEach, describe, expect, test} from "@jest/globals";
import {PedidoEnvio} from "../src/pedidos/pedidoEnvio";
import { Categoria } from "../src/categoria";
import { TipoEstacion } from "../src/cocina/tipoEstacion";

describe("Prueba de la clase ItemIndividual", () => {

    let instance:PedidoEnvio;

    beforeEach(()=> {
        instance = new PedidoEnvio("");
    });

    afterEach(()=> {});



    test("Debe ser instancia de la clase Pedido", ()=>{
        expect(instance).toBeInstanceOf(PedidoEnvio);
    });

    // test("Debe guardar y devolver el nombre de la instancia", ()=>{
    //     instance.setNombre("Pizza");
    //     const result = instance.getNombre();
    //     expect(result).toBe("Pizza");
    // });
    // test("Debe guardar y devolver el precio", () => {
    //     instance.setPrecio(500);
    //     expect(instance.getPrecio()).toBe(500);
    // });

    // test("Debe devolver su categoría y su estación", () => {
    //     expect(instance.getCategoria()).toBe(Categoria.PLATO_PRINCIPAL);
    //     expect(instance.getTipoEstacion()).toBe(TipoEstacion.PARRILLA);
    // });

    // test("Debe devolverse a sí mismo como componente", () => {
    //     expect(instance.getComponentes()).toEqual([instance]);
    // });

});