import { ItemIndividual } from "./itemIndividual"
import { List } from "./estructuraDatos/listaEnlazada"
import { Combo } from "./combo";
import { Categoria } from "./categoria";
import { ErrorEnMenu} from "./Errores/errorEnMenu";

export class Menu {
    private entradas: List<ItemIndividual>;
    private platosPrincipales: List<ItemIndividual>;
    private bebidas: List<ItemIndividual>;
    private postres: List<ItemIndividual>;
    private combos: List<Combo>;
    private listaPorCategoria: Map<Categoria, List<ItemIndividual>>;

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

    public agregarItem(item: ItemIndividual): void {
        this.getItemPorCategoria(item.getCategoria()).push(item);
    }

    public sacarItem(item: ItemIndividual): void {
        this.getItemPorCategoria(item.getCategoria()).delete(item);
    }

    public agregarCombo(combo: Combo): void {
        this.combos.push(combo);
    }

    public sacarCombo(combo: Combo): void {
        this.combos.delete(combo);
    }

    public getItemPorCategoria(categoria: Categoria): List<ItemIndividual> {
        const lista = this.listaPorCategoria.get(categoria);
        if (!lista) {
            throw new ErrorEnMenu(`Categoria no encontrada: ${categoria}`);
        }
        
        return lista;
    }
}