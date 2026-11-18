import { ItemIndividual } from "./itemIndividual"
import { List } from "./estructuraDatos/listaEnlazada"
import { Combo } from "./combo";
import { Categoria } from "./categoria";
import { ErrorEnMenu} from "./Errores/errorEnMenu";

/**
 * Administra los productos y combos disponibles, organizados por categoria.
 */
export class Menu {
    private entradas: List<ItemIndividual>;
    private platosPrincipales: List<ItemIndividual>;
    private bebidas: List<ItemIndividual>;
    private postres: List<ItemIndividual>;
    private combos: List<Combo>;
    private listaPorCategoria: Map<Categoria, List<ItemIndividual>>;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     */
    public constructor() {
        this.entradas = new List<ItemIndividual>;
        this.platosPrincipales = new List<ItemIndividual>;
        this.bebidas = new List<ItemIndividual>;
        this.postres = new List<ItemIndividual>;
        this.combos = new List<Combo>;
        this.listaPorCategoria = new Map([
            [Categoria.ENTRADA, this.entradas],
            [Categoria.PLATO_PRINCIPAL, this.platosPrincipales],
            [Categoria.BEBIDA, this.bebidas],
            [Categoria.POSTRE, this.postres]
        ]);
    }

    /**
     * Agrega un producto individual al menu.
     * @param {ItemIndividual} item - Item involucrado en la operacion.
     */
    public agregarItem(item: ItemIndividual): void {
        this.getItemPorCategoria(item.getCategoria()).push(item);
    }

    /**
     * Quita un producto individual del menu.
     * @param {ItemIndividual} item - Item involucrado en la operacion.
     */
    public sacarItem(item: ItemIndividual): void {
        this.getItemPorCategoria(item.getCategoria()).delete(item);
    }

    /**
     * Agrega un combo al menu.
     * @param {Combo} combo - Dato necesario para realizar la operacion.
     */
    public agregarCombo(combo: Combo): void {
        this.combos.push(combo);
    }

    /**
     * Quita un combo del menu.
     * @param {Combo} combo - Dato necesario para realizar la operacion.
     */
    public sacarCombo(combo: Combo): void {
        this.combos.delete(combo);
    }

    /**
     * Devuelve la lista de productos de la categoria indicada.
     * @param {Categoria} categoria - Categoria del producto.
     * @returns {List<ItemIndividual>} Resultado de la operacion.
     */
    public getItemPorCategoria(categoria: Categoria): List<ItemIndividual> {
        const lista = this.listaPorCategoria.get(categoria);
        if (!lista) {
            throw new ErrorEnMenu(`Categoria no encontrada: ${categoria}`);
        }
        
        return lista;
    }
}
