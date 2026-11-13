import { describe, test, expect, beforeEach } from '@jest/globals';
import { ItemPedido } from '../src/itemPedido';
import { EstadoItem } from '../src/estadoItem';
import { ErrorEnItemPedido } from '../src/Errores/errorEnItemPedido';
import { ItemIndividual } from '../src/itemIndividual';
import { Categoria } from '../src/categoria';
import { TipoEstacion } from '../src/cocina/tipoEstacion';
import { EnPreparacion } from '../src/cocina/enPreparacion';

describe("test:De Items Pedidos",()=>{
    let itemSimple:ItemPedido;
    let productoMock:ItemIndividual;
    beforeEach(()=>{
        productoMock= new ItemIndividual(
            "Hamburguesa",
            Categoria.PLATO_PRINCIPAL,
            TipoEstacion.PARRILLA
        );
        //*si getPrecio no retorna valor cargado nos aseguramos que devuelva monto fijo
        if(typeof productoMock.getPrecio !=='function' || !productoMock.getPrecio()) {
             (productoMock as any).getPrecio=()=> 5000;
        }
        itemSimple= new ItemPedido(productoMock,2);
    });
    test("Debe instanciarse correctamente con producto y cantidad válida",()=>{ 
        expect(itemSimple.getProducto()).toBe(productoMock);
        expect(itemSimple.getCantidad()).toBe(2);
    });
    test("Debe lanzar ErrorEnItemPedido si la cantidad no es un entero mayor o igual a 1", ()=>{
         expect(() => new ItemPedido(productoMock, 0)).toThrow(ErrorEnItemPedido);
         expect(() => new ItemPedido(productoMock, -2)).toThrow(ErrorEnItemPedido);
         expect(() => new ItemPedido(productoMock, 1.5)).toThrow(ErrorEnItemPedido); 
    });
    test("Debe calcular el total correctamente (precio x cantidad)",()=>{
         expect(itemSimple.getTotal()).toBe(10000); 
    });
    test("Debe iniciar el estado PENDIENTE y permitir modificaciones",()=>{
        expect(itemSimple.getEstado()).toBe(EstadoItem.PENDIENTE);
        expect(itemSimple.puedeModificarse()).toBe(true);
    })
    test("Debe avanzar secuencialmente el estado en un item simple",()=>{
        // PENDIENTE -> EN_PREPARACION 
        itemSimple.avanzarEstado();
        expect(itemSimple.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        expect(itemSimple.puedeModificarse()).toBe(false); 
        // EN_PREPARACION -> LISTO 
        itemSimple.avanzarEstado();
        expect(itemSimple.getEstado()).toBe(EstadoItem.LISTO);
        expect(itemSimple.puedeModificarse()).toBe(false); 
    });
    test("Debería determinar el estado de un ítem compuesto según sus sub-preparaciones",()=> { 
        const itemCompuesto = new ItemPedido(productoMock, 1);
        const subItem1 = new ItemPedido(productoMock, 1);
        const subItem2 = new ItemPedido(productoMock, 1); 
        itemCompuesto.agregarPreparacion(subItem1);
        itemCompuesto.agregarPreparacion(subItem2);
        // Todas las preparaciones PENDIENTES 
        expect(itemCompuesto.getEstado()).toBe(EstadoItem.PENDIENTE);
        expect(itemCompuesto.puedeModificarse()).toBe(true);
        // Una preparación pasa a EN_PREPARACION -> el estado general pasa a EN_PREPARACION 
        subItem1.avanzarEstado(); 
        expect(itemCompuesto.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        expect(itemCompuesto.puedeModificarse()).toBe(false); 
        // Ambas preparaciones pasan a LISTO -> el estado general pasa a LISTO 
        subItem1.avanzarEstado();// subItem1 queda LISTO
        subItem2.avanzarEstado();// subItem2 queda EN_PREPARACION
        subItem2.avanzarEstado(); // subItem2 queda LISTO
        expect(itemCompuesto.getEstado()).toBe(EstadoItem.LISTO);
    });
    test("Debe lanzar ErrorEnItemPedido si se llama a avanzarEstado() en un ítem con preparaciones",()=>{
        const itemCompuesto = new ItemPedido(productoMock, 1);
        const subItem = new ItemPedido(productoMock, 1);
        itemCompuesto.agregarPreparacion(subItem);
        expect(()=>itemCompuesto.avanzarEstado()).toThrow(ErrorEnItemPedido);
        expect(()=>itemCompuesto.avanzarEstado()).toThrow( "Esta linea avanza segun las preparaciones en La cocina" );
    });
    test("Debería cubrir setEstado y avanzar cuando el ítem ya está LISTO",()=>{
        const bife=new ItemIndividual("Bife", Categoria.PLATO_PRINCIPAL, TipoEstacion.PARRILLA);
        const item=new ItemPedido(bife, 1);
        // Cubre setEstado() 
        item.setEstado(new EnPreparacion());
        expect(item.getEstado()).toBe(EstadoItem.EN_PREPARACION);
        // Pasa a LISTO 
        item.avanzarEstado();
        expect(item.getEstado()).toBe(EstadoItem.LISTO);
        // Intentar avanzar estando en LISTO dispara las líneas no cubiertas de listo.ts
        expect(()=> item.avanzarEstado()).toThrow(); });

});