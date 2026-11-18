import { UNIDAD } from "../Constantes/constantes"
import { DiaSemana } from "./diaSemana";

/**
 * El descuento se aplica directamente en la multiplicación:
 * Por default: 1 = 0%;
 * 0.9 = 10%;
 * 0.8 = 20%;
 * 0.7 = 30%;
 * ...
*/
export class DescuentoDia {
    private diaDeLaSemana: DiaSemana;
    private porcentajeDescuento: number;
    
    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {DiaSemana} diaDeLaSemana - Dato necesario para inicializar el objeto.
     * @param {number} porcentajeDescuento - Dato necesario para inicializar el objeto.
     */
    public constructor(diaDeLaSemana: DiaSemana, porcentajeDescuento?: number) {
        this.diaDeLaSemana = diaDeLaSemana;
        this.porcentajeDescuento = porcentajeDescuento ?? UNIDAD;
    }

    /**
     * Actualiza el dia de la semana configurado.
     * @param {DiaSemana} diaDeLaSemana - Dia al que corresponde el descuento.
     */
    public setDiaDeLaSemana(diaDeLaSemana:DiaSemana):void {
        this.diaDeLaSemana=diaDeLaSemana;
    }

    /**
     * Devuelve el dia de la semana configurado.
     * @returns {DiaSemana} Resultado de la operacion.
     */
    public getDiaDeLaSemana(): DiaSemana {
        return this.diaDeLaSemana;
    }

    /**
     * Actualiza el factor de descuento.
     * @param {number} porcentaje - Dato necesario para realizar la operacion.
     */
    public setPorcentajeDescuento(porcentaje:number): void {
        this.porcentajeDescuento=porcentaje;
    }
    
    /**
     * Devuelve el factor de descuento configurado.
     * @returns {number} Resultado de la operacion.
     */
    public getPorcentajeDescuento(): number {
        return this.porcentajeDescuento
    }
    
}
