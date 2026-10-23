import { Menu } from "./menu";
import { Cocina } from "./cocina/cocina";
import { GestorPedidos } from "./pedidos/gestorPedidos";
import { GestorPagos } from "./GestorPagos/gestorPagos";

export class Restaurante {
    private menu: Menu;
    private cocinas: Array<Cocina>;
    private gestorPedidos: GestorPedidos;
    private gestorPagos: GestorPagos;

    public constructor() {
        this.menu = new Menu();
        this.cocinas = new Array<Cocina>;
        this.gestorPedidos = new GestorPedidos();
        this.gestorPagos = new GestorPagos(this.gestorPedidos);
    }
}