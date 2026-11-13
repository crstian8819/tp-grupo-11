import { describe, test, expect, beforeEach } from '@jest/globals';
import { DistribuirItem } from '../src/cocina/distribuirItem';
import { Parrilla } from '../src/cocina/parrilla';
import { Barra } from '../src/cocina/barra';
import { CocinaFria } from '../src/cocina/cocinaFria';
import { CocinaDulce } from '../src/cocina/cocinaDulce';
import { ItemPedido } from '../src/itemPedido';
import { ItemIndividual } from '../src/itemIndividual';
import { Categoria } from '../src/categoria';
import { TipoEstacion } from '../src/cocina/tipoEstacion';
import { ErrorEnCocina } from '../src/Errores/errorEnCocina';
import { EstadoItem } from '../src/estadoItem';

describe("Test:Distriuir item",()=>{
    let parrilla:Parrilla;
    let barra:Barra;
    let cocinaFria:CocinaFria;
    let cocinaDulce: CocinaDulce;
    let distribuidor: DistribuirItem;
    
    beforeEach(()=>{
        //Instanciamos y encadenamos las 4 cocinas (Chain of Responsability) 
        parrilla=new Parrilla();
        barra=new Barra();
        cocinaFria=new CocinaFria();
        cocinaDulce=new CocinaDulce();

        parrilla.setSiguiente(barra).setSiguiente(cocinaFria).setSiguiente(cocinaDulce);

        //Instanciamos el distribuidor con la Primera cocina
        distribuidor=new DistribuirItem(parrilla);
    });
    test("Debe distribuir un item simple (1 unidad) a su cocina correspondiente",()=>{
        const bife=new ItemIndividual("Bife de Chorizo",Categoria.PLATO_PRINCIPAL,TipoEstacion.PARRILLA);
        const lineaBife=new ItemPedido(bife, 1);

        const generados=distribuidor.distribuir([lineaBife]);

        // Debe haber generado 1 sub-preparación
        expect(generados).toHaveLength(1); 
        // La Parrilla debe haber recibido el ítem y las otras cocinas estar vacías
        expect(parrilla.getItems()).toHaveLength(1);
        expect(barra.getItems()).toHaveLength(0);
        expect(cocinaFria.getItems()).toHaveLength(0);
        expect(cocinaDulce.getItems()).toHaveLength(0);
        
        // La línea del pedido debe registrar el estado PENDIENTE a través de su sub-preparación
        expect(lineaBife.getEstado()).toBe(EstadoItem.PENDIENTE);
     });
    test("Debe distribuir muchas unidades creando una sub-preparación individual por cada unidad",()=>{
        const cerveza=new ItemIndividual("Cerveza",Categoria.BEBIDA,TipoEstacion.BARRA);
        const lineaCervezas=new ItemPedido(cerveza, 3);// 3 unidades
        const generados = distribuidor.distribuir([lineaCervezas]);
        // Se deben generar 3 ítems de preparación
        expect(generados).toHaveLength(3);
        // La Barra debe recibir los 3 ítems
        expect(barra.getItems()).toHaveLength(3);
        expect(parrilla.getItems()).toHaveLength(0);
    });
    test("Debe distribuir un combo / producto compuesto enviando cada componente a su cocina correspondiente",()=>{
        const bife=new ItemIndividual("Bife de Chorizo",Categoria.PLATO_PRINCIPAL,TipoEstacion.PARRILLA);
        const flan=new ItemIndividual("Flan con Dulce", Categoria.POSTRE, TipoEstacion.COCINA_DULCE);
        // Simulamos un producto compuesto (Combo) con 2 componentes
        const productoCombo={ getPrecio:()=>20000,getComponentes:()=>[bife, flan] } as any;
        const lineaCombo=new ItemPedido(productoCombo, 1);
        const generados=distribuidor.distribuir([lineaCombo]);
        // Se deben haber generado 2 ítems (uno para Parrilla y otro para Cocina Dulce)
        expect(generados).toHaveLength(2);
        expect(parrilla.getItems()).toHaveLength(1);
        expect(cocinaDulce.getItems()).toHaveLength(1);
        expect(barra.getItems()).toHaveLength(0); 
    });
    test("Debe lanzar ErrorEnCocina si un producto requiere una estación no existente",()=>{
        // Creamos un distribuidor con una cadena incompleta (solo Parrilla)
        const distribuidorIncompleto=new DistribuirItem(new Parrilla());
        const jugo=new ItemIndividual("Jugo de Naranja", Categoria.BEBIDA, TipoEstacion.BARRA);
        const lineaJugo=new ItemPedido(jugo, 1);
        expect(()=>distribuidorIncompleto.distribuir([lineaJugo])).toThrow(ErrorEnCocina);
    });
});