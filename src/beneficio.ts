import { ItemIndividual } from "./itemIndividual";

export interface Beneficio {
    calcularBeneficio(items: ItemIndividual[]): number;
}