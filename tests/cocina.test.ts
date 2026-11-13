import { describe, test, expect, beforeEach } from '@jest/globals';
import { EstadoItem } from '../src/estadoItem';
import { ItemPedido } from '../src/itemPedido';
import { TipoEstacion } from '../src/cocina/tipoEstacion';
import { ErrorEnCocina } from '../src/Errores/errorEnCocina';
import { Parrilla } from '../src/cocina/parrilla';
import { Barra } from '../src/cocina/barra';
import { CocinaDulce } from '../src/cocina/cocinaDulce';
import { CocinaFria } from '../src/cocina/cocinaFria';
import { ItemIndividual } from '../src/itemIndividual';
import { Categoria } from '../src/categoria';
describe("Pruebas Unitarias de Cocina",()=>{
    let parrilla:Parrilla;
    let barra:Barra;
    let cocinaFria:CocinaFria;
    let cocinaDulce:CocinaDulce;
    let itemParrilla:ItemPedido;

    beforeEach(()=>{
        parrilla= new Parrilla();
        barra= new Barra();
        cocinaFria = new CocinaFria(); 
        cocinaDulce = new CocinaDulce();
        //* Instanciacion con los 3 parametros del constructor
        const bife = new ItemIndividual(
          "Bife de Chorizo", 
          Categoria.PLATO_PRINCIPAL, 
          TipoEstacion.PARRILLA,
        ); 
        itemParrilla= new ItemPedido(bife,1); 
    });
    test("Debe obtener el nombre de la cocina", ()=>{ 
        expect(parrilla.getNombre()).toBe("Parrilla");
     }); 
     
    test("Debe responder si atiende la estación", ()=>{
        expect(parrilla.atiende(TipoEstacion.PARRILLA)).toBe(true);
        expect(parrilla.atiende(TipoEstacion.BARRA)).toBe(false); 
    }); 
    test("Debe recibir e incorporar ítems a la lista de la cocina", ()=>{
        parrilla.recibirItem(itemParrilla);
        const items = parrilla.getItems(); 
        expect(items).toHaveLength(1); 
        expect(items[0]).toBe(itemParrilla); 
    }); 
    test("Debe procesar el siguiente item (PENDIENTE -> EN_PREPARACION)", ()=>{
        parrilla.recibirItem(itemParrilla); 
        parrilla.procesarSiguiente(); 
        expect(itemParrilla.getEstado()).toBe(EstadoItem.EN_PREPARACION);
    }); 
    test("Debe avanzar hasta LISTO y lanzar error si se intenta procesar sin ítems pendientes", ()=>{
        parrilla.recibirItem(itemParrilla);
        parrilla.procesarSiguiente(); // PENDIENTE -> EN_PREPARACION
        parrilla.procesarSiguiente(); // EN_PREPARACION -> LISTO 
        expect(itemParrilla.getEstado()).toBe(EstadoItem.LISTO);
        expect(() => parrilla.procesarSiguiente()).toThrow(ErrorEnCocina);
    }); 
    test("Debe recorrer la Cadena de Responsabilidad (buscarCocina)", ()=>{
        parrilla.setSiguiente(barra).setSiguiente(cocinaFria).setSiguiente(cocinaDulce);
        expect(parrilla.buscarCocina(TipoEstacion.PARRILLA)).toBe(parrilla);
        expect(parrilla.buscarCocina(TipoEstacion.BARRA)).toBe(barra);
        expect(parrilla.buscarCocina(TipoEstacion.COCINA_FRIA)).toBe(cocinaFria);
        expect(parrilla.buscarCocina(TipoEstacion.COCINA_DULCE)).toBe(cocinaDulce);
    });
    test("Debe lanzar ErrorEnCocina si ninguna cocina de la cadena atiende la estación", ()=>{
        parrilla.setSiguiente(barra);
        expect(() => parrilla.buscarCocina(TipoEstacion.COCINA_DULCE)).toThrow(ErrorEnCocina);
    });
});
