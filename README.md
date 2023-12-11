# Proyecto Final de Computación Móvil - bioSafe
Proyecto final para la asignatura de Computación Movil de la Universidad Tecnológica Metropolitana.

---

## Integrantes
* [Martín Sobarzo Huerta](https://github.com/Meshdako)
* [Renato Palominos](https://github.com/ReenaPalominos)
* [Rodrigo Ubilla Castro](https://github.com/RodrigoUbillaC)

---

## bioSafe
![bioSafe](./assets/hojas256.png)


## Descripción

La aplicación consiste en una herramienta que permite a los usuarios publicar denuncias ciudadanas (reportes de calles sucias, situaciones particulares, etc), o pueden publicar eventos (Ferias ecologicas, eventos ecologicos, ollas comunes, etc).

Esta aplicación es de facil utilización, permitiendo al usuario realizar una publicación de forma intuitiva.

El proyecto esta compuesto de un autentificador de usuarios (Login y CreateUser), posteriormente nos encontramos con un Menu Inicial que permite utilizar las vistas de Denuncias, Eventos, Mapa y Perfil.

Denuncias y Eventos son similares, se trata de publicaciones, donde en primer lugar se encuentra un resumen de todas, y luego al presionar una se puede ver con mayor detalle.

Tambien es posible crear una nueva publicación y borrar las que pertenezcan a tu usuario.

Para crear una nueva publicación es necesario un título, una descripción, una imagen y que estes ubicado en el lugar de la publicación, ya que, la aplicación utilizara tu ubicación como referencia de la misma.

Es posible modificar tu nombre de usuario y tu imagen de perfil.


---

## Requisitos

Para hacer funcionar la aplicación se necesita:

Procedemos a clonar el repositorio e instalar las dependencias necesarias.

```
$ git clone https://github.com/ReenaPalominos/Proyecto_final_CM
$ cd Proyecto_final_CM/
$ npm install
```
Posterior a esto, se debe instalar las dependencias que no vienen incluidas con el comando anterior, por tanto, debemos instalarlas para el funcionamiento de la aplicación.

```
$ npm install @react-navigation/native-stack
$ npm install @react-navigation/bottom-tabs
```
Ya que se instalaron las dependencias, se procede a ejecutar la aplicación.

Existen 2 alternativas para ejecutar la aplicación:

### Alternativa 1
```
$ npm start
$ REACT_NATIVE_PACKAGER_HOSTNAME=[IP] npm start
```

### Alternativa 2
```
$ npx expo start
```

Finalmente, tomamos la nuestro dispositivo móvil y escaneamos el código QR que nos aparece en la terminal en la aplicación de Expo Go.

---

## Capturas de pantalla

[CAPTURAS DE PANTALLA]

