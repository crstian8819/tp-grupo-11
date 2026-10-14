import { MedioPago } from "./medioPago";
export abstract class GestorPagos implements MedioPago{
    
    //Me parece que tendria que tener una relación con MedioPago pero no implementarlo.
    pagar(): void {

    }

    //FALTA CREAR CLASE 'FACTURA' y LOGICA DE IMPLEMENTACION
    //public cobrar(pedido: Pedido): Factura {

    //}

    /*
        método Cobrar(pedido:Pedido): Factura {}
	 >Al cobrar el pedido deberia cambiar el estado del pedido a 'FACTURADO'. 
       Si retorna Factura deberiamos hacer una nueva clase Factura. 
       Entonces, al devolver Factura se pasa la Factura por parametro para registrarPedido(factura:Factura):void -> los guarda en el Map de pedidosFinalizados(gestorPedidos).
	 >Para que el restaurante pueda pasar por parametro pedido en cobrar(pedido:Pedido) deberia llamar al gestorPedidos para obtener el pedido? tipo:
	        gestorPagos.cobrar(gestorPedidos.getPedido(id_pedido)) --> retorna una Factura.
	 >Esa Factura la pasamos por parametro a registrarPedido, entonces:
	        gestorPedidos.registrarPedido(gestorPagos.cobrar(gestorPedidos.getPedido(id_pedido))); 
            --> Este metodo tendria sus throw error si hay algun problema en el medio. 
            -->> Para invocar el metodo solo se pasaria el id del Pedido.
	 >Esta manera sería la alternativa que pienso porque el GestorPagos no esta vinculado directamente con el GestorPedidos, sino,
      el GestorPagos al cobrar el pedido podría directamente llamar al método de GestorPedido -> registrarPedido(factura:Factura): void; 
      <COMENTARIO>: Factura contiene todos los datos del pedido :)
    */
}