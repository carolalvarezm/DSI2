# Práctica 2: JSpotify

## Parcel y estructura del proyecto
* En la práctica anterior instalamos parcel de forma global, por lo que no debemos volver a instalarlo en esta.
    
    ![Versiones parcel](https://github.com/ULL-ESIT-DSI-1920/dsi-p2-jspotify-alu0100944723/tree/master/src/assets/Capturas_Readme/parcel.png)

* Para comenzar hacemos la estructura de carpetas como en la anterior práctica:
    ```
    mkdir -p dsi-p1-parcel/src/{css,js,assets}
    touch src/index.html src/js/index.js src/css/index.css
    ```

* También inicializamos git y añadimos lo que creamos necesario al .gitignore:
    ![gitignore](https://github.com/ULL-ESIT-DSI-1920/dsi-p2-jspotify-alu0100944723/tree/master/src/assets/Capturas_Readme/gitignore.png)

* Inicializamos npm y añadimos los scripts para usar parcel más fácilmente.Añadimos también uno para desplegar en ghpages cuando necesitemos dentro del package.json:
   ```
    "scripts": {
            "clean": "rm -rf dist package-lock.json node_modules",
            "start": "parcel src/index.html --port 8080",
            "build": "parcel build src/index.html -d build --public-url /dsi-p2-jspotify-alu0100944723/",
            "deploy": "gh-pages -d build",
        },
    ```
* Instalamos los módulos que vamos a utilizar como el ghpages.


## Aspecto Visual
* El código que tenemos en el index.html es el siguiente:
    ```html
        <!DOCTYPE html>
        <html lang="en">

        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>JSpotify</title>
            <link rel="stylesheet" href="./css/index.css" />
            <script defer src="./js/index.js"></script>
        </head>

        <body>
            <div class="item item-1 flex">
                <div class="cover">
                    <img src="./assets/believer.jpg" alt="Believer">
                </div>
                <div class="vinyl flex">
                    <div class="label flex">
                        <div class="hole"></div>
                    </div>
                </div>
            </div>
            <div class="item item-2 flex">
                <div class="cover">
                    <img src="./assets/hey_brother.jpg" alt="Hey Brother">
                </div>
                <div class=" vinyl flex ">
                    <div class="label flex ">
                        <div class="hole "></div>
                    </div>
                </div>
            </div>
            <div class="item item-3 flex ">
                <div class="cover ">
                    <img src="./assets/we_will_rock_you.jpg " alt="We will rock you ">
                </div>
                <div class="vinyl flex ">
                    <div class="label flex ">
                        <div class="hole "></div>
                    </div>
                </div>
            </div>
        </body>

        </html>
    ```
    * Donde tenemos 3 div que contendrán por una parte la imagen de la carátula y una estructura para el vinilo.

* En el index.css hacemos varias cosas:
    * En primer lugar todos los elementos con clase flex los centramos.
    ```css
        .flex {
        display: flex;
        justify-content: center;
        align-items: center;
        }
    ```
    * Después controlamos que las imágenes sean cuadradas y todas del mismo tamaño:
    ```css
        img {
        width: 200px;
        height: 200px;
        }
    ```
    * A continuación le damos estilo al vinilo:
    ```css
        .vinyl {
            width: 200px;
            height: 200px;
            background: black;
            border-radius: 50%;
        }

        .label {
            z-index: 5;
            width: 65px;
            height: 65px;
            margin: auto;
            border-radius: 50%;
            background: red;
        }

        .hole {
            z-index: 5;
            width: 10px;
            height: 10px;
            margin: auto;
            border-radius: 50%;
            background: white;
        }

    ```
    * A la clase vinyl le añadimos el siguiente estilo:
        ```css
            z-index: -1;
            transform: translateX(-200px);
            transition: transform 0.5s;
        ```
        * Lo primero, ```z-index: -1;``` ,nos sirve para mandar el vinilo al fondo.
        * Lo segundo, ```translateX(-200px);```, nos sirve para mover el vinilo detrás de la portada.
        * Lo último, ```transition: transform 0.5s;```, nos sirve para que el movimiento no se haga de golpe.

    * Por último añadimos una nueva norma de estilo para los vinilos que estén a continuación de una clase open, para que se mueva:
        ```css
            .open+.vinyl {
                transform: translateX(-50px);
            }

        ```            
* En el index.js para la parte visual seleccionamos los elementos con clase cover y añadimos a cada uno un listener para que cuando cliquemos se añada la clase open y se nos traslade el vinilo hacia la derecha o vuelva detrás de la carátula:
    ```javascript

    const cover = document.querySelectorAll(".cover");

    cover.forEach(function(cover) {
    cover.addEventListener("click", function() {
        cover.classList.toggle("open");
    });
    });
    ```
* El resultado de lo anterior es el siguiente:

    ![Vinilo desplazándose](https://github.com/ULL-ESIT-DSI-1920/dsi-p2-jspotify-alu0100944723/tree/master/src/assets/Capturas_Readme/vinilo.gif)

## API Multimedia
* Lo siguiente que realizaremos es añadir a nuestro index.js un diccionario con el elemento html y el nombre de la canción:
```javascript
    const map = {
  ".item-1": "believer",
  ".item-2": "hey_brother",
  ".item-3": "we_will_rock_you",
    };
```
* A continuación instanciamos la clase player que a continuación explicaremos. Nuestro index.js quedaría así:
    ```javascript
    import Player from "./player.js";

    const cover = document.querySelectorAll(".cover");

    cover.forEach(function(cover) {
    cover.addEventListener("click", function() {
        cover.classList.toggle("open");
    });
    });

    const map = {
    ".item-1": "believer",
    ".item-2": "hey_brother",
    ".item-3": "we_will_rock_you",
    };

    const player = new Player(map);
    player.run();
    ```

### Clase Player
* Esta clase se ocupará de instanciar las canciones y analizar el diccionario que le pasaremos desde el *index.js*.
* Lo primero que hacemos en nuestro *player.js* es importar nuestra clase song. A continuación creamos la clase y el método *run()* que se ocupará de instanciar las clases Song por cada entrada del mapa que le hemos pasado. Por último la exportamos:
    ```javascript
        import Song from "./song.js";

        class Player {
        constructor(mapa) {
            this.mapa = mapa;
        }

        run() {
            const song = [];
            Object.entries(this.mapa).forEach(element => {
            song.push(new Song(element));
            });
        }


        }
        export default Player;
    ```
### Clase Song
* La clase Song se ocupa de coger la ruta del archivo mp3 que contiene la canción, declarar un nuevo objeto Audio de la API multimedia y pasarle la ruta anterior. 
* Para ello lo primero que hago es importar los archivos .mp3 de mi carpeta.
* A continuación en el constructor de la clase, cogemos el índice del objeto mp3AudioFile con la clave que le hemos pasado desde la clase Player.
* Después dentro de los valores, que contendrán la ruta dentro de la carpeta dist al archivo de audio, del objeto mp3AudioFile cogemos el que tiene el mismo índice y finalmente con eso instanciamos un nuevo Audio.
* Por último seleccionamos por la clase que le pasamos también en el constructor y añadimos un evento que hará que inicie o se pause la canción cuando clickemos sobre ella.
    ```javascript
    import mp3AudioFile from "../assets/*.mp3";

    class Song {
    constructor(cancion) {
        const indice = Object.keys(mp3AudioFile).indexOf(cancion[1]);
        const audio = new Audio(Object.values(mp3AudioFile)[indice]);
        
        const item = document.querySelector(cancion[0]);
        item.onclick = () => {
        if (audio.paused) audio.play();
        else audio.pause();
        };

    }

    }

    export default Song;
    ```
* Podemos ver el resultado en el siguiente [link](https://ull-esit-dsi-1920.github.io/dsi-p2-jspotify-alu0100944723/).


## Eslint y prettier
* Para la comprobación del código con ESlint he añadido un script de npm:


    ![Utilizando ESlint](https://github.com/ULL-ESIT-DSI-1920/dsi-p2-jspotify-alu0100944723/tree/master/src/assets/Capturas_Readme/eslint.png)
* Para la utilización de prettier he instalado una extensión del vscode que directamente al guardar formatea el código: 

    ![Extensión Prettier](https://github.com/ULL-ESIT-DSI-1920/dsi-p2-jspotify-alu0100944723/tree/master/src/assets/Capturas_Readme/prettier.png)
    ![Utilizando Prettier](https://github.com/ULL-ESIT-DSI-1920/dsi-p2-jspotify-alu0100944723/tree/master/src/assets/Capturas_Readme/prettier.gif)
## Ghpages
* Desplegamos en gh-pages con los dos scripts de npm que añadimos al principio. Podemos verlo en la siguiente (url)[https://ull-esit-dsi-1920.github.io/dsi-p2-jspotify-alu0100944723/]:

    ![npm build](https://github.com/ULL-ESIT-DSI-1920/dsi-p2-jspotify-alu0100944723/tree/master/src/assets/Capturas_Readme/build.png)
    ![npm deploy](https://github.com/ULL-ESIT-DSI-1920/dsi-p2-jspotify-alu0100944723/tree/master/src/assets/Capturas_Readme/deploy.gif)

## Retos
### Reto 1 : Funcionalidades Extra
### Reto 2 : Howler.js
### Reto 3 : Trabajando con el DOM 