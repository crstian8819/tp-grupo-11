import { ItemIndividual } from "./itemIndividual";
import { Beneficio } from "./beneficio";
import { Item } from "./item";
import { NUM_DOS } from "./Constantes/constantes"
import { ErrorEnCombo } from "./Errores/errorEnCombo";

/**
 * Representa un conjunto de productos cuyo precio se calcula mediante un beneficio.
 */
export class Combo extends Item {
    private items: ItemIndividual[];
    private beneficio: Beneficio;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {string} nombre - Dato necesario para inicializar el objeto.
     * @param {ItemIndividual[]} productos - Dato necesario para inicializar el objeto.
     * @param {Beneficio} beneficio - Dato necesario para inicializar el objeto.
     */
    public constructor(nombre:string,productos: ItemIndividual[], beneficio: Beneficio) {
        super(nombre);
        if (productos.length < NUM_DOS) {
            throw new ErrorEnCombo("Un combo debe tener al menos 2 productos");
        }
        this.items = [... productos];
        this.beneficio = beneficio;
    }

    /**
     * Calcula y actualiza el precio del combo segun el beneficio configurado.
     */
    public setPrecio(): void {
        this.precio = this.beneficio.calcularBeneficio(this.items);
    }
    
    /**
     * Devuelve el precio actual.
     * @returns {number} Resultado de la operacion.
     */
    public getPrecio(): number {
        return this.precio;
    }

    /**
     * Devuelve los productos individuales que componen el elemento.
     * @returns {ItemIndividual[]} Resultado de la operacion.
     */
    public getComponentes(): ItemIndividual[] {
        return [...this.items];
    }
}
