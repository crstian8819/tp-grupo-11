import { Descuento } from "./descuento";
import { Pedido } from "../pedido";
import { MedioPago } from "./medioPago";
//TODO: DESPUES DEL MERGE JUNTAR TODAS LAS CONSTANTES DE LAS CLASES EN UNA SOLA CARPETA 'CONSTANTES'
const TEN_PERCENT:number=0.1;
export class Efectivo implements MedioPago, Descuento{
    private porcentajeDescuento: number;

    constructor() {
        this.porcentajeDescuento=TEN_PERCENT;
    }

    public calcularDescuento(pedido: Pedido): number {
        return pedido.getPrecio()*this.porcentajeDescuento
    }
    
    //FALTA LOGICA DE IMPLEMENTACION
    public pagar(monto: number): void {
        
    }
}