// Función para filtrar canciones usando una expresión regular
export const filterSongsByRegex = (array, regex) => {
    return array.filter(element => regex.test(element));
};

class Song {
    constructor(id, nombre, author, duracion, album, año, genero, cover, urlSong) {
        this.id=id,
        this.nombre = nombre;
        this.author = author;
        this.duracion = duracion;
        this.album = album;
        this.año = año;
        this.genero = genero;
        this.cover = cover;
        this.urlSong = urlSong;
    }
    getSongId() {
        return this.id;
    }

    getSongName() {
        return this.nombre;
    }
   
}


class Playlist {
    constructor(nombre, listaCanciones = [] , ordenEscucha) {
        this.nombre = nombre;
        this.listaCanciones = listaCanciones;
        this.ordenEscucha = ordenEscucha; 
    }

    getPlaylistName() {
        return this.nombre
    }

    getPlaylistSongs() {
        return this.listaCanciones
    }

    getPlaylistListeningOrder() {
        return this.ordenEscucha
    }

    /* addSongToPlaylist(song, playlist) {
        switch (playlist) {
            case 'favorites':
                favorites.listaCanciones.push(song);
                break;
            case 'myPlaylist':
                myPlaylist.listaCanciones.push(song);
                break;
            default:
                // Si el nombre de la lista no es válido, no hacemos nada
                return;
        }
        this.dibujarCanciones();
    } */

    addSongToPlaylist(song) {
        this.listaCanciones.push(song)
        this.dibujarCanciones(); 
    }  

    removeSongFromPlaylist(songId) {
        this.listaCanciones = this.listaCanciones.filter(s => s !== songId) 
        this.dibujarCanciones(); 
    }

    dibujarCanciones() {
        let canciones = document.getElementById(this.nombre);
  
        canciones.innerHTML = ''; // Limpiar el contenido existente del elemento HTML

        this.listaCanciones.forEach(song => {
            
            // Verificar si la canción está en la lista de favoritos o en miPlaylist
            const isFavorite = favorites.listaCanciones.some(favSong => favSong.id === song.id);
            const isInMyPlaylist = myPlaylist.listaCanciones.some(mySong => mySong.id === song.id);

            // Definir el texto y la clase del botón "like" según la presencia de la canción en favoritos
            const likeButtonText = isFavorite ? 'dislike' : 'like';
            const likeButtonClass = isFavorite ? 'dislikeSongBtn' : 'likeSongBtn';

            // Definir el texto y la clase del botón "add" según la presencia de la canción en miPlaylist
            const addButtonText = isInMyPlaylist ? 'removeadd' : 'add';
            const addButtonClass = isInMyPlaylist ? 'removeaddSongBtn' : 'addSongBtn';

            // Crear la representación HTML de la canción con los botones actualizados
            const songHTML = `
                <li class="song" data-idCancion="${song.id}">
                    <span>${song.nombre}</span>
                    <button class="playSongBtn" data-idCancion="${song.id}">play</button>
                    <button class="${likeButtonClass}" data-idCancion="${song.id}">${likeButtonText}</button>
                    <button class="${addButtonClass}" data-idCancion="${song.id}">${addButtonText}</button>
                </li>`;

            // Agregar la canción al contenido del elemento HTML
            canciones.innerHTML += songHTML;
        });
    };

    

    playPlaylist() {
        this.listaCanciones.forEach(
            song => {
                console.log('playing: ' + song.nombre)
            }
        );
    }

    getCurrentSong(i) {
        return this.listaCanciones[i]
    }

    nextSong() {
        return this.listaCanciones.shift()
    }
};

class Reproductor {
    catalogodeCanciones;
    currentSong;
    currentPlaylist;
    constructor() {

        //Inicializador de reproductor
        this.catalogodeCanciones = [
            new Song(1, 'nombre1', 'author1', 'duracion1', 'album1', 'año1', 'genero1', '/assets/covers/1.jpg', '/assets/songs/1.mp3'),
            new Song(2, 'nombre2', 'author2', 'duracion2', 'album2', 'año2', 'genero2', '/assets/covers/2.jpg', '/assets/songs/2.mp3'),
            new Song(3, 'nombre3', 'author3', 'duracion3', 'album3', 'año3', 'genero3', '/assets/covers/3.jpg', '/assets/songs/3.mp3'),
            new Song(4, 'nombre4', 'author2', 'duracion4', 'album2', 'año2', 'genero2', '/assets/covers/2.jpg', '/assets/songs/4.mp3'),
            new Song(5, 'nombre5', 'author5', 'duracion5', 'album5', 'año5', 'genero5', '/assets/covers/5.jpg', '/assets/songs/5.mp3'),
        ]

        this.mostrarCanciones(); //reproduce automatico
        this.currentSong = this.catalogodeCanciones[0]; // guarda cancion que estiy reproduciendo
        this.audio = new Audio();
        
        this.searchPlaylist = new Playlist('busqueda');
        this.currentPlaylist = this.searchPlaylist; //al iniciar
        this.currentPlaylist.listaCanciones = this.catalogodeCanciones
        console.log(this.currentPlaylist)
        this.inicializarBusqueda()

        //listener
        document.addEventListener('playSong', () => {
            this.currentSong = e.detail.song;
            this.play();
        })

        //empieza pausada
        this.isPause = false;
        this.inicializarControles();

        let buscar = document.getElementById('results');
        buscar.addEventListener('click', () => {
            this.buscarCancion(document.getElementById('search').value);
        });

        // registro play al construir la clase
        let play = document.getElementById('play');
        play.addEventListener('click', () => {
            this.play();
        });

    };

    //Metodo que busca una cancion por su nombre
   /*  buscarCancion(songName) {
        return this.catalogodeCanciones.find(song => song.nombre === songName)
    }; */

    //Metodo que busca el autor de una cancion 
   /*  buscarCancion(songAuthor) {
        return this.catalogodeCanciones.find(song => song.author === songAuthor)
    }; */


    buscarCancion(songName) {
        
        // Busca la canción por su nombre
        const foundSong = this.catalogodeCanciones.find(song => song.nombre === songName);
        
        if (foundSong) {
            // Agrega la canción encontrada a la lista de reproducción actual
            this.addSongToPlaylist(foundSong);
            // Retorna la canción encontrada
            return foundSong;
        } else {
            console.log('Canción no encontrada');
            return null;
        }
    };

// listener para el campo de búsqueda
    inicializarBusqueda() {
        let searchInput = document.getElementById('search');
        let searchBtn = document.getElementById('searchBtn');
        let resultsContainer = document.getElementById('results');

        searchBtn.addEventListener('click', () => {
            let busqueda = searchInput.value.trim(); // Eliminar espacios en blanco al inicio y al final
            if (busqueda !== '') {
                const regExp = new RegExp(busqueda, 'i');
                let cancionesFiltradas = this.catalogodeCanciones.filter(song => regExp.test(song.nombre));
                this.mostrarCancionesFiltradas(cancionesFiltradas, resultsContainer);
            } else {
                // Si el campo de búsqueda está vacío, mostrar la lista completa
                this.mostrarCanciones(this.catalogodeCanciones, resultsContainer);
            }
        });
    }


    addPlaylist(id, playlist) {
        let cancion = this.catalogodeCanciones.find(song => song.id == id);
        console.log(cancion);
        switch (playlist) {
            case 'favorites':
                favorites.addSongToPlaylist(cancion);
                break;
            case 'myPlaylist':
                myPlaylist.addSongToPlaylist(cancion);
                break;
        }
    }
    agregarEventListenersDislike() {
        // Listener para el botón "dislike" en canciones filtradas
        let dislikeSongs = document.getElementsByClassName('dislikeSongBtn');

        for (let i = 0; i < dislikeSongs.length; i++) {
            dislikeSongs[i].addEventListener('click', () => {
                let id = dislikeSongs[i].parentElement.getAttribute('data-idCancion');
                
                // Remover la canción de la lista de favoritos
                this.removeSongFromFavorites(id);
            });
        }
    }
    //Remove playlist
    removeSongFromFavorites(songId) {
        // Encuentra la canción en la lista de favoritos y elimínala
        favorites.removeSongFromPlaylist(songId);

        // También puedes volver a dibujar las canciones en la lista de favoritos
        favorites.dibujarCanciones();
    }

    

    inicializarControles() {

        
        

    }
    mostrarCancionesFiltradas(canciones, container) {
        container.innerHTML = ''; // Limpiar el contenedor de resultados antes de agregar nuevos elementos

        canciones.forEach(song => {
            container.innerHTML += `
                <li class="song" data-idCancion='${song.id}'>
                    <span data-idCancion='${song.id}'>${song.nombre}</span>
                    <button class='playSongBtn' data-idCancion='${song.id}'>play</button>
                    <button class='likeSongBtn' data-idCancion='${song.id}'>like</button>
                    <button class='addSongBtn' data-idCancion='${song.id}'>add</button>
                </li >`;
        });
    }
    //Metodo que muestra los nombres de canciones en lista de busqueda 
    mostrarCanciones() {
        let canciones = document.getElementById('results');

        this.catalogodeCanciones.forEach(song => {
            canciones.innerHTML += `
                <li class="song" data-idCancion='${song.id}'>
                    <span data-idCancion='${song.id}'>${song.nombre}</span>
                    <button class='playSongBtn' data-idCancion='${song.id}'>play</button>
                    <button class='likeSongBtn' data-idCancion='${song.id}'>like</button>
                    <button class='addSongBtn' data-idCancion='${song.id}'>add</button>
                </li >`;            
        });

        
        //Listener para boton de reproduccion en canciones
        let playSongs = document.getElementsByClassName('playSongBtn');

         for (let i = 0; i < playSongs.length; i++) {
            playSongs[i].addEventListener('click', () => {
                this.currentPlaylist = 'busqueda'
                let id = playSongs[i].parentElement.getAttribute('data-idCancion');
                this.currentSong = this.catalogodeCanciones.find(song => song.id === id);
                let newindex = id-1
                this.currentSong = this.catalogodeCanciones[newindex];
                this.mostrarCancionActual()
                this.play(this.currentSong);
            });
        };
        

        //Listener para boton de favoritos en canciones
        let favoriteSongs = document.getElementsByClassName('likeSongBtn');

            for (let i = 0; i < favoriteSongs.length; i++) {
                favoriteSongs[i].addEventListener('click', () => {
                this.currentPlaylist = favorites;
                let id = favoriteSongs[i].parentElement.getAttribute('data-idCancion');
                this.addPlaylist(id, 'favorites');
            });
        };

        //Listener para boton de add  en canciones
         let playListSongs = document.getElementsByClassName('addSongBtn');
        
            for (let i = 0; i < playListSongs.length; i++) {
                    playListSongs[i].addEventListener('click', () => {
                    this.currentPlaylist = myPlaylist
                    let id = playListSongs[i].parentElement.getAttribute('data-idCancion');
                    this.addPlaylist(id, 'myPlaylist');
            });
        }; 

        //
        //Listener para boton de favoritos en canciones
        let removeFavoriteSongs = document.getElementsByClassName('dislikeSongBtn');

        for (let i = 0; i < removeFavoriteSongs.length; i++) {
            removeFavoriteSongs[i].addEventListener('click', () => {
                // Obtener el ID de la canción
                let id = removeFavoriteSongs[i].parentElement.getAttribute('data-idCancion');
                
                // Obtener la canción desde la lista de favoritos usando el ID
                let song = favorites.listaCanciones.find(song => song.id === id);
                
                // Llamar a removeSongFromPlaylist con el ID de la canción
                favorites.removeSongFromPlaylist(song.id);
            });

        };

    }

    //Metodo que muestra la cancion actual en reproduccion
    mostrarCancionActual() {
        let cancionActual = document.getElementById('nombreCancion');
        cancionActual.innerHTML = `<p class='cancion'>${this.currentSong.nombre}</p>`;
        
        let authorActual = document.getElementById('authorCancion');
        authorActual.innerHTML = `<p class='cancion'>${this.currentSong.author}</p>`;
        
        let durationActual = document.getElementById('durationCancion');
        durationActual.innerHTML = `<p class='cancion'>${this.currentSong.duracion}</p>`;
        
        let albumActual = document.getElementById('albumCancion');
        albumActual.innerHTML = `<p class='cancion'>${this.currentSong.album}</p>`;

        let añoActual = document.getElementById('añoCancion');
        añoActual.innerHTML = `<p class='cancion'>${this.currentSong.año}</p>`;

        let generoActual = document.getElementById('generoCancion');
        generoActual.innerHTML = `<p class='cancion'>${this.currentSong.genero}</p>`;

        let coverActual = document.getElementById('coverCancion');
        coverActual.src = this.currentSong.cover;
    };

    
    //Reproducir audio
    play() {
        let playBtn = document.getElementById('play');
        playBtn.addEventListener('click', () => {
            if (this.currentSong.urlSong !== undefined && this.isPause == false) {
                this.audio.src = this.currentSong.urlSong;
                this.audio.play();
                
            } else {
                this.audio.play();
                this.isPause = true;
            };
        })
    };

    //Pausar cancion
    pause() {
        let pauseBtn = document.getElementById('pause');
        pauseBtn.addEventListener('click', () => {
            console.log('estoy pausado');
            //this.audio.pause()
            if (!this.audio.paused) {
                this.audio.pause();
            } else {
                this.audio.play();
            }
        });
    }

    //Detener cancion
    stop() {
        let stopBtn = document.getElementById('stop')
        stopBtn.addEventListener('click', () => {
            console.log('estoy detenido')
            this.audio.pause();
            this.audio.currentTime = 0;
            this.isPause = true;
        })
    };
    
    //Mutear
    mute() {
        let muteBtn = document.getElementById('mute')
        muteBtn.addEventListener('click', () => {
            console.log('estoy muteado');
            // this.audio.muted = !this.audio.muted;
            if (this.audio.muted) {
                this.audio.muted = false; // Restaurar el sonido
            } else {
                this.audio.muted = true; // Silenciar el audio
            }
        })
        
    }

    //Siguiente cancion
    next() {
        /* let nextBtn = document.getElementById('next');
        nextBtn.addEventListener('click', () => {
            console.log('Pasando a la siguiente canción');

            // Encuentra la posición actual de la canción en la lista de reproducción
            const currentIndex = this.currentPlaylist.listaCanciones.indexOf(this.currentSong);

            // Verifica si hay una canción siguiente en la lista de reproducción
            if (currentIndex < this.currentPlaylist.listaCanciones.length - 1) {
                // Avanza al siguiente elemento en la lista
                const nextSong = this.currentPlaylist.listaCanciones[currentIndex + 1];
                this.currentSong = nextSong;
                console.log('necesita click en play')
                this.play(this.audio)
                this.mostrarCancionActual();            
            } else {
                console.log('No hay más canciones en la lista');
            }
        }); */

        //
        let nextBtn = document.getElementById('next');
        nextBtn.addEventListener('click', () => {
            console.log('Pasando a la siguiente canción');

            // Verifica si hay una canción siguiente en la lista de reproducción
            if (this.currentPlaylist.listaCanciones.length > 0) {
                // Avanza al siguiente elemento en la lista y lo asigna como la canción actual
                this.currentSong = this.currentPlaylist.nextSong();
                console.log('necesita click en play')
                this.play(this.audio);
                this.mostrarCancionActual();
            } else {
                console.log('No hay más canciones en la lista');
            }
        });
    }

}

export let reproductor = new Reproductor(); 
export let favorites = new Playlist('favorites', [], 'shuffle');
export let myPlaylist = new Playlist('myPlaylist', [], 'shuffle');
