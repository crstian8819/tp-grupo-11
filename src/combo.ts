import { ItemIndividual } from "./itemIndividual";
import { Beneficio } from "./beneficio";
import { Item } from "./item";
import { NUM_DOS } from "./Constantes/constantes"
import { ErrorEnCombo } from "./Errores/errorEnCombo";

export class Combo extends Item {
    private items: ItemIndividual[];
    private beneficio: Beneficio;

    public constructor(nombre:string,productos: ItemIndividual[], beneficio: Beneficio) {
        super(nombre);
        if (productos.length < NUM_DOS) {
            throw new ErrorEnCombo("Un combo debe tener al menos 2 productos");
        }
        this.items = [... productos];
        this.beneficio = beneficio;
    }

    public setPrecio(): void {
        this.precio = this.beneficio.calcularBeneficio(this.items);
    }
    
    public getPrecio(): number {
        return this.precio;
    }

    public getComponentes(): ItemIndividual[] {
        return [...this.items];
    }
}