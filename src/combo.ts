import { ItemIndividual } from "./itemIndividual";
import { Beneficio } from "./beneficio";
import { Item } from "./item";
import { ZERO, NUM_DOS } from "./Constantes/constantes"

export class Combo extends Item {
    private productos: ItemIndividual[];
    private beneficio: Beneficio;

    public constructor(nombre:string,productos: ItemIndividual[], beneficio: Beneficio) {
        super(nombre);
        if (productos.length < NUM_DOS) {
            throw new Error("Un combo debe tener al menos 2 productos");
        }
        this.productos = [... productos];
        this.beneficio = beneficio;
    }

    public getPrecio(): number {
        const suma = this.productos.reduce(
            (total, item) => total + item.getPrecio(),
            ZERO
        );
        return this.beneficio.calcularBeneficio(suma);
    }

    
    public getComponentes(): ItemIndividual[] {
        return [...this.productos];
    }
}