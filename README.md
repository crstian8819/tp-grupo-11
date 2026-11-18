**TP GRUPO 11**

**Funcionalidades principales**

°Gestor de pedidos

El sistema permite crear tres tipos de pedidos:

*Pedido de salon: asociado a un numero de mesa.
*Pedido para retirar: asociado a un horario.
*Pedido de envio: asociado a una direccion y un costo adicional de envio.

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

°Restaurante

La clase Restaurante actua como el punto de entrada unificado del sistema, integrando y coordinando los componentes de Menu, GestorPedidos, GestorPagos y la cadena de estaciones de Cocina.

Permite crear pedidos en sus distintas modalidades, configurar promociones, coordinar la confirmacion y distribucion de los items a las cocinas correspondientes, y procesar los cobros sin exponer la complejidad interna de los subsistemas.

°Organizacion del proyecto

El proyecto se esta organizado dentro de la carpeta src, separando las responsabilidades de las distintas partes del sistema.

- src: contiene las clases y archivos principales del sistema, separados segun la responsabilidad de cada uno.
- tests: contiene las pruebas unitarias de las distintas partes del proyecto.
- diagrama: contiene el diagrama de clases y los diagramas de secuencia.
- package.json: contiene las dependencias y los comandos que se pueden utilizar para trabajar con el proyecto.
- tsconfig.json: contiene la configuracion de TypeScript.
- jest.config.js: contiene la configuracion utilizada para ejecutar las pruebas.

**PATRONES DE DISEÑO UTILIZADOS**

Durante el desarrollo se aplicaron distintos patrones de diseño para organizar las responsabilidades.

Facade: utilizado en la clase Restaurante para proporcionar un punto de acceso unificado que simplifica la interaccion y coordinacion entre el Menu, los Gestores de Pedidos y Pagos, y la cadena de Cocinas.

Command: para representar las modificaciones de los pedidos, permitiendo ejecutar y deshacer operaciones como agregar o eliminar items.

State: utilizado para representar los distintos estados de preparacion de un item y definir su comportamiento al avanzar entre ellos.

Chain of Responsibility: utilizado en la busqueda de las cocinas, permitiendo recorrer las distintas estaciones hasta encontrar la que corresponde al producto que debe prepararse.

Strategy: utilizado para aplicar distintos beneficios sobre los combos. De esta manera se puede cambiar la forma de calcular el precio del combo sin modificar la clase Combo.

**INSTALACION Y EJECUCION DEL PROYECTO**

°Requisitos previos

Para trabajar con el proyecto es necesario tener instalado:

- Node.js.
- npm, que se instala junto con Node.js.
- Visual Studio Code o algun otro editor de codigo.

°Instalacion de dependencias

Una vez descargado el proyecto, abrir una terminal dentro de la carpeta principal, donde se encuentra el archivo package.json.

Ejecutar el siguiente comando para instalar las dependencias necesarias:

npm install

°Compilacion del proyecto

Para compilar el codigo TypeScript y verificar que no existan errores de codigo, ejecutar:

npm run build


°Ejecucion de las pruebas

Para ejecutar las pruebas unitarias del proyecto utilizar:

npm run test


°Revision del codigo

Para revisar el codigo y detectar posibles problemas de estilo o errores de lint, ejecutar:



°Funcionamiento del sistema

El sistema se encuentra organizado en clases que trabajan en conjunto para administrar los pedidos de un restaurante.
Primero se pueden crear pedidos de salon, para retirar o de envio. Luego se agregan los productos o combos del menu y se pueden realizar modificaciones mientras el pedido se encuentre en estado EN_CONSTRUCCION.

Cuando se confirma el pedido, sus items se distribuyen entre las distintas estaciones de cocina segun el tipo de preparacion que necesita cada producto. Los items pasan por los estados PENDIENTE, EN_PREPARACION y LISTO.

Una vez que el pedido esta confirmado y todos sus items se encuentran listos, se puede realizar el cobro. El GestorPagos calcula los descuentos correspondientes y genera la factura, que queda guardada en el historial de pedidos finalizados.

°Documentacion del codigo

El codigo fuente cuenta con comentarios realizados utilizando el formato JSDoc para explicar las clases, metodos, parametros y valores de retorno. Estos comentarios se encuentran dentro de los archivos TypeScript de la carpeta src.

**IMPORTANTE**

El proyecto tiene configurados los comandos para compilar el codigo y ejecutar las pruebas unitarias. En esta version no se encuentra incluido un archivo de entrada src/index.ts, por lo tanto el comando npm run start no permite iniciar una aplicacion de forma independiente. Para verificar el funcionamiento de las funcionalidades implementadas se pueden ejecutar las pruebas unitarias con npm run test.
