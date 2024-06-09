# Perrinder

Proyecto final de 2 DAM elaborado por Juan Antonio Marquez en el instituto IES Zaidin-Vergeles

## Índice
- [Definición del proyecto](#definición)
- [Tags](#tags)
- [Desarrollo](#desarrollo)
- [Conclusiones](#conclusiones)
- [Recursos](#recursos)
- [Autor](#authors)

## Definición
Es una aplicación móvil sobre un tinder de perros con estructura de cliente servidor. Tu puedes dar like o dislike a los perros que te gusten o no te gusten y si el dueño del perro también te da like se creará un match y podrás hablar con el dueño del perro a través de un chat. Puedes subir fotos de tu perro y editar su perfil. También puedes ver los perros que te han dado like y los que te han dado dislike.

## Tags
- React Native
- NestJS
- MySQL
- TypeScript
- Expo

## Desarrollo
Para el desarrollo de la aplicación se ha utilizado React Native con Expo para el cliente y Node con NestJS para el servidor. La base de datos es MySQL y se ha utilizado TypeScript para el desarrollo de la aplicación. 

### Cliente/App
Para explicar el desarrollo establecido en el lado de la aplicación móvil he usado esta estructura de carpetas:

<br><br>
<img src="https://github.com/ByMarqueZz/Perrinder/blob/master/client/assets/readme/client.png" alt="Estructura de carpetas">
<br><br>

Contamos con las siguientes carpetas y archivos:
- **assets**: En esta carpeta se encuentran las imágenes que se utilizan en la aplicación.
- **components**: En esta carpeta se encuentran los componentes que se utilizan en la aplicación.
- **pages**: En esta carpeta se encuentran las páginas JSX que se utilizan en la aplicación.
- **routes**: En esta carpeta se encuentran las rutas de la aplicación.
- **redux**: En esta carpeta se encuentran los states de la aplicación.
- **App.tsx**: Archivo principal de la aplicación.

Para conectar la aplicación móvil con la parte del backend utilizamos peticiones HTTP/HTTPS GET, POST, PUT y DELETE. Para la gestión de las fotos quiero utilizar Firebase.

### Servidor
El servidor se ha desarrollado con Node y NestJS. La estructura de carpetas es la siguiente:

<br><br>
<img src="https://github.com/ByMarqueZz/Perrinder/blob/master/client/assets/readme/server.png" alt="Estructura de carpetas">
<br><br>

Contamos con una carpeta para cada tabla de nuestra base de datos y dentro de ella contamos con entity, create_dto, update_dto, controller, module y service. Controlando tanto los datos de la entidad y el gestión de base de datos como los END POINTS y la lógica de negocio. Para la seguridad de la aplicación backend he implementado JWT. Es un sistema de autenticación que se basa en la generación de un token que se envía al cliente y este lo envía en cada petición para comprobar que está autenticado y así evitar que cualquier persona pueda acceder a los datos de la aplicación. Para permitir que el cliente pueda acceder a los datos de la aplicación he implementado CORS. Es un sistema que permite que un cliente pueda acceder a los datos de un servidor que no está en el mismo dominio y a parte se utiliza la tecnología de WebSockets para el chat de la aplicación. Para el almacenaje de las fotos he utilizado [Firebase Storage](https://firebase.google.com/docs/storage?hl=es) que para subir y descargar fotos es sencillo:
```TypeScript
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";

// Descargar fotos
const promises = data.map(async (pet: any) => {
    const photoUrls = await Promise.all(pet.photos.map(async (photo: any) => {
        const storage = getStorage();
        const storageRef = ref(storage, photo.path);
        return getDownloadURL(storageRef);
    }));

    return {
        id: pet.id,
        name: pet.name,
        images: photoUrls
    };
});

// Subir fotos
const uploadTasks = images.map(async (image) => {
    const imageBlob = await urlToBlob(image);
    return uploadToFirebase(imageBlob);
});
```

### Base de datos
A continuación se muestra el diagrama de la base de datos.
<br><br>
<img src="https://github.com/ByMarqueZz/Perrinder/blob/master/client/assets/readme/database.png" alt="Diagrama de la base de datos">
<br><br>

Es una base de datos hecha en MySQL siendo las entidades clave users y pets y teniendo como entidades más secundarias en la lógica de negocio de la aplicación, como like, message y photos.

### Despliegue y puesta en producción
Para realizar el despliegue contamos de dos partes principales de la aplicación, el cliente (aplicación móvil hecha en React Native) que la compilado a apk ya que la otra opción es subirlo a las tiendas como Google Play y App Store y tiene un coste monetario por lo que lo descarté para un proyecto final, y luego tengo la segunda parte que es servidor (API REST hecha en NestJS y NodeJS) que para desplegarla he utilizado un servidor VPS personal que tengo presencialmente en mi casa y que me conecto a él a través de ssh y ftp. Para su despliegue he compilado el proyecto y desplegado en local con [pm2](https://pm2.keymetrics.io) luego he abierto los puertos en red que en este caso he elegido el puerto 8000 y asignado un subdominio de mi dominio personal, generando también los archivos ssl para tener cifrado https con [certbot](https://certbot.eff.org)

## Conclusiones
En conclusión, el proyecto ha sido un reto para mí ya que he tenido que aprender a utilizar tecnologías que no conocía como React Native, NestJS, TypeScript y  MySQL. Aunque he tenido problemas con la conexión de la aplicación móvil con el servidor y con la base de datos, he conseguido solucionarlos y he aprendido mucho en el proceso. Además, he aprendido a gestionar un proyecto de principio a fin. En el futuro, me gustaría seguir trabajando en este proyecto y añadir nuevas funcionalidades como la geolocalización de los perros o la posibilidad de subir vídeos.

## Recursos
- [React Native](https://docs.expo.dev)
- [NestJS](https://docs.nestjs.com)
- [MySQL](https://dev.mysql.com/doc)
- [TypeScript](https://www.typescriptlang.org/docs)
- [Expo](https://docs.expo.dev)
- [JWT](https://jwt.io/introduction)
- [CORS](https://developer.mozilla.org/es/docs/Web/HTTP/CORS)

## Authors
- [@ByMarquezz](https://www.github.com/bymarquezz)

