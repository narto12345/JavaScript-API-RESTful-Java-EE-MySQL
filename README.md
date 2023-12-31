# JavaScript-API-RESTful-Java-EE-MySQL
Aplicación CRUD Web API RESTful que se conecta a una base de datos MySQL, implementada con Java EE, JavaScript y alojada en un servidor Glassfish.

Video de presentación: 

Esta aplicación CRUD sigue una arquitectura en n capas, y está conformada de la siguiente manera:
Capa del cliente:
-	Elaborado con JavaScript nativo y consume el API RESTful por medio del método “fetch”.
El Backend está desarrollado con Java EE 8 alojado en un servidor de aplicaciones Glassflish 5.0:
Capa de servicio:
-	En esta capa se crea un servicio RESTful, implementando JAX-RS con jersey client de Glassfish.
Capa de datos:
-	Elaborada con la implementación EclipseLink de la API de JPA.
-	La unidad de persistencia la suministra el servidor de Glassflish, por medio de un pool de conexiones.
Base de datos:
-	El motor MySQL, y contiene una base de datos llamada “test”, la cual aloja una tabla llamada “persona”.
