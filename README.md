**TP GRUPO 11**

**Funcionalidades principales**

°Gestor de pedidos

El sistema permite crear tres tipos de pedidos:

*Pedido de salon: asociado a un numero de mesa
*Pedido para retirar: asociado a un horario
*Pedido de envio: asociado a una direccion y un costo adicional de envio 

Todos los pedidos comparten una estructura y un comportamiento mediante la clase abstracta Pedido.
Los pedidos comienzan en estado EN_CONSTRUCCION y permiten agregar o eliminar items mientras se encuentren en ese estado.
Ademas se registra un historial de modificaciones que permite deshacer la ultima operacion realizada sobre el pedido.

El GestorPedidos se encarga de crear, identificar y registrar los pedidos, ademas de coordinar su confirmacion y consultar el historial de pedidos finalizados.

°Menu y productos

El menu organiza los productos segun su categoria:

*Entradas.
*Platos principales.
*Bebidas.
*Postres.

Tambien permite incorporar combos, que agrupan dos o mas productos y calculan su precio mediante un beneficio aplicado sobre sus productos.

°Preparacion en cocina

El sistema tiene distintas estaciones de cocina, cada una encargada de distintos tipos de preparacion.
Al confirmar un pedido sus items son distribuidos a las cocinas correspondientes segun la estacion que le corresponda.
La preparacion de los items contempla tres estados:

*PENDIENTE
*EN_PREPARACION
*LISTO

Un pedido solo puede facturarse cuando esta CONFIRMADO y todos sus items se encuentran listos.

°Gestor de pagos y Facturacion

El GestorPagos se encarga de calcular los descuentos correspondientes y generar las facturas de los pedidos.
Se tiene en cuenta descuentos por pago en efectivo y descuentos asociados a determinados dias de la semana.

Al facturar un pedido se genera una factura con su id, el pedido correspondiente y el monto final calculado.
Las facturas quedan registradas en el historial administrado por GestorPedidos.

°Organizacion del proyecto

El proyecto se esta organizado dentro de la carpeta src, separando las responsabilidades de las distintas partes del sistema.

**PATRONES DE DISENO UTILIZADOS**

Durante el desarrollo se aplicaron distintos patrones de diseno para organizar las responsabilidades

Command: para representar las modificaciones de los pedidos, permitiendo ejecutar y deshacer operaciones como agregar o eliminar items.

State: utilizado para representar los distintos estados de preparacion de un item y definir su comportamiento al avanzar entre ellos.

Chain of Responsibility: utilizado en la busqueda de las cocinas, permitiendo recorrer las distintas estaciones hasta encontrar la que corresponde al producto que debe prepararse.