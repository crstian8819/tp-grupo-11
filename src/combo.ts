import { ItemIndividual } from "./itemIndividual";
import { Beneficio } from "./beneficio";
import { Item } from "./item";
import { CERO, NUM_DOS } from "./Constantes/constantes"
import { ErrorEnCombo } from "./Errores/errorEnCombo";

export class Combo extends Item {
    private productos: ItemIndividual[];
    private beneficio: Beneficio;

    public constructor(nombre:string,productos: ItemIndividual[], beneficio: Beneficio) {
        super(nombre);
        if (productos.length < NUM_DOS) {
            throw new ErrorEnCombo("Un combo debe tener al menos 2 productos");
        }
        this.productos = [... productos];
        this.beneficio = beneficio;
    }

    public getPrecio(): number {
        const suma = this.productos.reduce(
            (total, item) => total + item.getPrecio(),
            CERO
        );
        return this.beneficio.calcularBeneficio(suma);
    }

    
    public getComponentes(): ItemIndividual[] {
        return [...this.productos];
    }
}