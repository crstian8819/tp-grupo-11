export class DescuentoDia {
    private diaDeLaSemana: string;
    private porcentajeDescuento: number;

    public constructor(diaDeLaSemana?: string, porcentajeDescuento?: number) {
        this.diaDeLaSemana = diaDeLaSemana ?? '';
        this.porcentajeDescuento = porcentajeDescuento ?? 0;
    }

    public setDiaDeLaSemana(diaDeLaSemana:string):void {
        this.diaDeLaSemana=diaDeLaSemana;
    }

    public getDiaDeLaSemana(): string {
        return this.diaDeLaSemana;
    }

    public setPorcentajeDescuento(porcentaje:number): void {
        this.porcentajeDescuento=porcentaje;
    }
    
    public getPorcentajeDescuento(): number {
        return this.porcentajeDescuento
    }
    
}