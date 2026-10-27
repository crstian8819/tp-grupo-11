import { UNIDAD } from "../Constantes/constantes"
import { DiaSemana } from "./diaSemana";

export class DescuentoDia {
    private diaDeLaSemana: DiaSemana;
    private porcentajeDescuento: number;

    public constructor(diaDeLaSemana: DiaSemana, porcentajeDescuento?: number) {
        this.diaDeLaSemana = diaDeLaSemana;
        this.porcentajeDescuento = porcentajeDescuento ?? UNIDAD;
    }

    public setDiaDeLaSemana(diaDeLaSemana:DiaSemana):void {
        this.diaDeLaSemana=diaDeLaSemana;
    }

    public getDiaDeLaSemana(): DiaSemana {
        return this.diaDeLaSemana;
    }

    public setPorcentajeDescuento(porcentaje:number): void {
        this.porcentajeDescuento=porcentaje;
    }
    
    public getPorcentajeDescuento(): number {
        return this.porcentajeDescuento
    }
    
}