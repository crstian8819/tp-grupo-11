import { ItemPedido } from "../itemPedido";
import { Cocina } from "./cocina";


export class DistribuirItem {
    private primeraCocina: Cocina;

    public constructor(primeraCocina: Cocina) {
        this.primeraCocina = primeraCocina;
    }

    
    public distribuir(lineas: ItemPedido[]): ItemPedido[] {
        const envios: { cocina: Cocina; item: ItemPedido,linea:ItemPedido }[] = [];

        for (const linea of lineas) {
            for (let i = 0; i < linea.getCantidad(); i++) {
                for (const componente of linea.getProducto().getComponentes()) {
                    const estacion = componente.getTipoEstacion();
                    const cocina = this.primeraCocina.buscarCocina(estacion);
                    
                    envios.push({ cocina, item: new ItemPedido(componente, 1),linea });
                }
            }
        }

        envios.forEach(envio => {
            envio.cocina.recibirItem(envio.item);
            envio.linea.agregarPreparacion(envio.item);
        });
        return envios.map(envio => envio.item);
    }
}
