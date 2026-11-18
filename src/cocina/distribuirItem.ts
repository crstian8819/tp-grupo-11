import { ItemPedido } from "../itemPedido";
import { Cocina } from "./cocina";
import { CERO, UNIDAD } from "../Constantes/constantes"


/**
 * Distribuye los componentes de las lineas de pedido entre las cocinas correspondientes.
 */
export class DistribuirItem {
    private primeraCocina: Cocina;

    /**
     * Inicializa el objeto y establece sus valores iniciales.
     * @param {Cocina} primeraCocina - Dato necesario para inicializar el objeto.
     */
    public constructor(primeraCocina: Cocina) {
        this.primeraCocina = primeraCocina;
    }

    
    /**
     * Distribuye cada componente de las lineas del pedido en su cocina correspondiente.
     * @param {ItemPedido[]} lineas - Lineas de items que se deben distribuir.
     * @returns {ItemPedido[]} Resultado de la operacion.
     */
    public distribuir(lineas: ItemPedido[]): ItemPedido[] {
        const envios: { cocina: Cocina; item: ItemPedido,linea:ItemPedido }[] = [];

        for (const linea of lineas) {
            for (let i = CERO; i < linea.getCantidad(); i++) {
                for (const componente of linea.getProducto().getComponentes()) {
                    const estacion = componente.getTipoEstacion();
                    const cocina = this.primeraCocina.buscarCocina(estacion);
                    
                    envios.push({ cocina, item: new ItemPedido(componente, UNIDAD),linea });
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
