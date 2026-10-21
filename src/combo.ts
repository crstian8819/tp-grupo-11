import { ItemIndividual } from "./itemIndividual";
import { Producto } from "./producto";
import { Beneficio } from "./beneficio";

export class Combo implements Producto {
    private productos: ItemIndividual[];
    private beneficio: Beneficio;

    constructor(productos: ItemIndividual[], beneficio: Beneficio) {
        if (productos.length < 2) {
            throw new Error("Un combo debe tener al menos 2 productos");
        }
        this.productos = productos;
        this.beneficio = beneficio;
    }

    public getPrecio(): number {
        const suma = this.productos.reduce(
            (total, item) => total + item.getPrecio(),
            0
        );
        return this.beneficio.calcularBeneficio(suma);
    }

    public getProductos(): ItemIndividual[] {
        return [...this.productos];
    }
}