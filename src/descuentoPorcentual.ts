import { Beneficio } from "./beneficio";
import { ErrorEnDescuento } from "./Errores/errorEnDescuento";
import { CERO, UNIDAD } from "./Constantes/constantes"
import { ItemIndividual } from "./itemIndividual";

export class DescuentoPorcentual implements Beneficio {
    /**
     * @param descuento - Se aplica directamente en la multiplicación:
     * 0.9 = 10%;
     * 0.8 = 20%;
     * 0.7 = 30%;
     * ...
     */
    public constructor(private descuento:number) {
        if (descuento < CERO || descuento > UNIDAD) {
            throw new ErrorEnDescuento("El descuento debe estar entre 0 y 1");
        }
    }

    public calcularBeneficio(items: ItemIndividual[]): number {
        let precioCombo:number = CERO;
        items.forEach((item: ItemIndividual) => {
            precioCombo += item.getPrecio();
        });
        precioCombo = precioCombo*this.descuento;
        return precioCombo;
    }
}