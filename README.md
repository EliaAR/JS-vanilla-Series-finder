# modulo-2-evaluacion-final-EliaAR
http://beta.adalab.es/modulo-2-evaluacion-final-EliaAR/

El proyecto consiste en una aplicación web de búsqueda de series de TV, a través de la introducción de datos en un campo de texto y la posterior pulsación del botón correspondiente. 
Por otro lado, se podrán escoger las series favoritas pulsando en la imagen de las mismas, lo que las hará aparecer en la sección de favoritas.

Especificidades:
- La búsqueda de las series se hará a través de la función fetch que recogerá datos del Endpoint de la API de TVmaze
- Se ha implementado un sistema de caché usando LocalStorage. Cuando se pulse el botón de buscar, la aplicación comprobará primero si esa búsqueda está ya guardada en el LocalStorage, en caso de que esté, obtendrá los datos de ahí y no hará la llamada a la API
- Una vez se tengas los datos, se pintarán en la sección de “listado de series”. En dicho proceso se distinguirá entre las series que tienen imagen y las que no para solvertar errores y se aplicará una imagen por defecto para evitar tales errores (ya que los datos que se aportarán de las mismas serán el nombre y la foto)
- La usuaria podrá escoger en la sección de ”listado de series” sus series favoritas, pulsando la imagen de las mismas. Lo que hará aparecer la serie en la sección de favoritas
- El fondo de dicha imagen cambiará de color para indicar que ha sido seleccionada. Ese color permanecerá aunque se recargue la página y sólo desaparecerá si se elimina dicha serie de la sección de favoritas
- La aplicación evita los errores de duplicado de una serie en la sección de favoritas si se pulsa varias veces la imagen de dicha serie en la sección de “listado de series”
- Existen dos posibilidades de borrado en la sección de favoritas:
   . Un botón de reset que vacía toda la sección
   . Eliminar una sola serie, pulsando el botón que aparace en cada una de ellas
- Las series favoritas se guardarán también en el LocalStorage en una key separada. La opción de borrado de una serie favorita la borrará también del LocalStorage. La opción de reset, borrará la key del LocalStorage
