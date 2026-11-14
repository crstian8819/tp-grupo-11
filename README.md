**TP GRUPO 11**

**Funcionalidades principales**

°Gestor de pedidos

El sistema permite crear tres tipos de pedidos:

*Pedido de salón: asociado a un número de mesa.
*Pedido para retirar: asociado a un horario.
*Pedido de envio: asociado a una dirección y un costo adicional de envío.

Todos los pedidos comparten una estructura y un comportamiento mediante la clase abstracta Pedido.
Los pedidos comienzan en estado EN_CONSTRUCCION y permiten agregar o eliminar ítems miéntras se encuentren en ese estado.
Además se registra un historial de modificaciones que permite deshacer la última operación realizada sobre el pedido.

El GestorPedidos se encarga de crear, identificar y registrar los pedidos, además de coordinar su confirmación y consultar el historial de pedidos finalizados.

°Menú y productos

El menú organiza los productos según su categoría:

*Entradas.
*Platos principales.
*Bebidas.
*Postres.

También permite incorporar combos, que agrupan dos o más productos y calculan su precio mediante un beneficio aplicado sobre sus productos.

°Preparación en cocina

El sistema tiene distintas estaciones de cocina, cada una encargada de distintos tipos de preparación.
Al confirmar un pedido sus ítems son distribuidos a las cocinas correspondientes según la estación que le corresponda.
La preparación de los ítems contempla tres estados:

*PENDIENTE
*EN_PREPARACION
*LISTO

Un pedido solo puede facturarse cuando está CONFIRMADO y todos sus ítems se encuentran listos.

°Gestor de pagos y Facturación

El GestorPagos se encarga de calcular los descuentos correspondientes y generar las facturas de los pedidos.
Se tiene en cuenta descuentos por pago en efectivo y descuentos asociados a determinados días de la semana.

Al facturar un pedido se genera una factura con su id, el pedido correspondiente y el monto final calculado.
Las facturas quedan registradas en el historial administrado por GestorPedidos.

°Restaurante

La clase Restaurante actúa como el punto de entrada unificado del sistema, integrando y coordinando los componentes de Menú, GestorPedidos, GestorPagos y la cadena de estaciones de Cocina.

Permite crear pedidos en sus distintas modalidades, configurar promociones, coordinar la confirmación y distribución de los ítems a las cocinas correspondientes, y procesar los cobros sin exponer la complejidad interna de los subsistemas.

°Organización del proyecto

El proyecto se está organizado dentro de la carpeta src, separando las responsabilidades de las distintas partes del sistema.

**PATRONES DE DISEÑO UTILIZADOS**

Durante el desarrollo se aplicaron distintos patrones de diseño para organizar las responsabilidades.

Facade: utilizado en la clase Restaurante para proporcionar un punto de acceso unificado que simplifica la interacción y coordinación entre el Menú, los Gestores de Pedidos y Pagos, y la cadena de Cocinas.

Command: para representar las modificaciones de los pedidos, permitiendo ejecutar y deshacer operaciones como agregar o eliminar ítems.

State: utilizado para representar los distintos estados de preparación de un ítem y definir su comportamiento al avanzar entre ellos.

Chain of Responsibility: utilizado en la búsqueda de las cocinas, permitiendo recorrer las distintas estaciones hasta encontrar la que corresponde al producto que debe prepararse.