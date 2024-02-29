// Función para filtrar canciones usando una expresión regular
export const filterSongsByRegex = (array, regex) => {
    return array.filter(element => regex.test(element));
};

export const filter = () => { console.log('la importacion de funciones esta ok') }

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

    getSongId(){
        return `${this.id}`
    }
    getSongNameAndAuthor(){
        return `${this.nombre}` + `${this.author}` 
    }

    getSongNameAndDuration(){
        return `${this.nombre}` + `${this.duracion}` 
    }

    getSongNameAndAlbum() {
        return `${this.nombre}` + `${this.album}`  
    }

    getSongNameAndYear(){
        return `${this.nombre}` + `${this.año}` 
    }

    getSongNameAndCover(){
        return `${this.nombre}` + `${this.cover}` 
    }

    getSongUrlSong(){
        return `${this.nombre}` + `${this.urlSong}` 
    }
}


class Playlist {
    constructor(nombre, listaCanciones, ordenEscucha) {
        this.nombre = nombre;
        this.listaCanciones = listaCanciones;
        this.ordenEscucha = ordenEscucha; 
    }

    getPlaylistName() {
        return `${this.nombre}`
    }

    getPlaylistSongs() {
        return `${this.listaCanciones}`
    }

    getPlaylistListeningOrder() {
        return `${this.ordenordenEscucha}`
    }

    addSongToPlaylist(song){
        this.listaCanciones.push(song);
        //this.dibujarCanciones();
    }

    dibujarCanciones() {
        let canciones = document.getElementById(this.nombre);
        let alterna = '';
        let alterna2 = '';
        switch (this.nombre) {
            case 'resfavorites':
                alterna = '+';
                alterna2 = '*';
                break;
            case 'resmyPlaylist':
                alterna = '-';
                alterna2 = '/';
                break;
        }
        canciones.innerHTML = +`

        
        `
        
    }

    removeSongFromPlaylist(song) {
        this.listaCanciones=this.listaCanciones.filter(s=>s!==song) 
    }

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
            new Song(1,'nombre1', 'author1', 'duracion1', 'album1', 'año1', 'genero1', '/assets/covers/1.jpg', '/assets/songs/1.mp3'),
            new Song(2,'nombre2', 'author2', 'duracion2', 'album2', 'año2', 'genero2', '/assets/covers/2.jpg', '/assets/songs/2.mp3'),
            new Song(3,'nombre3', 'author3', 'duracion3', 'album3', 'año3', 'genero3', '/assets/covers/3.jpg', '/assets/songs/3.mp3'),
            new Song(4,'nombre4', 'author2', 'duracion4', 'album2', 'año2', 'genero2', '/assets/covers/2.jpg', '/assets/songs/4.mp3'),
            new Song(5,'nombre5', 'author5', 'duracion5', 'album5', 'año5', 'genero5', '/assets/covers/5.jpg', '/assets/songs/5.mp3'),
        ] 

        this.mostrarCanciones(); //reproduce automatico
        this.currentSong = this.catalogodeCanciones[0]; // guarda cancion que estiy reproduciendo
        this.audio = new Audio();
        this.currentPlaylist = 'busqueda';

        this.miPlaylist = new Playlist('playlist');
        this.favorites = new Playlist('favorites');

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

    inicializarControles() {//aqui se rompre
        //Listener del buscador
       /* let buscar = document.getElementById('buscar')
        buscar.addEventListener('click', () => {
/* 
        });*/

        //Controles


        //
        /* this.audio.addEventListener('ended', () => {
            /* 
        } ) */

    }

    //Metodo que muestra los nombres de canciones en lista de busqueda 
    mostrarCanciones(playlist) {
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

        for (let i = 0; i < playSongs.length; i++){
            playSongs[i].addEventListener('click', () => {
                this.currentPlaylist = 'busqueda'
                let id = playSongs[i].parentElement.getAttribute('data-idCancion');
                this.currentSong = this.catalogodeCanciones.find(song => song.id === id);
                this.play();
            });
        };

        //Listener para boton de favoritos en canciones
        let favoriteSongs = document.getElementsByClassName('likeSongBtn');
        
        for (let i = 0; i < favoriteSongs.length; i++){
            favoriteSongs[i].addEventListener('click', () => {
                console.log('favorites ok')
                this.currentPlaylist = 'results'
                let id = favoriteSongs[i].parentElement.getAttribute('data-idCancion');
                this.addPlaylist(id, 'favorites');
            });
        };

        //Listener para boton de add  en canciones
        let playListSongs = document.getElementsByClassName('addSongBtn');
        
        for (let i = 0; i < playListSongs.length; i++){
            playListSongs[i].addEventListener('click', () => {
                console.log('add ok')
                this.currentPlaylist = 'results'
                let id = playListSongs[i].parentElement.getAttribute('data-idCancion');
                this.addPlaylist(id, 'playlist');
            });
        };



    }; 

   


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


    //Metodo que busca una cancion por su nombre
    buscarCancion(songName) {
        return this.catalogodeCanciones.find(song => song.nombre === songName)
    };

    //Metodo que busca el autor de una cancion 
    buscarCancion(songAuthor) {
        return this.catalogodeCanciones.find(song => song.author === songAuthor)
    };


    //Add playlist
    addPlaylist  (id, playlist)  {
        let cancion = this.catalogodeCanciones.find(song => song.id == id)
        switch (playlist) {

            case 'favorites':
                this.favorites.addSongToPlaylist(cancion);
                break;
            case 'playlist':
                this.miPlaylist.addSongToPlaylist(cancion);
                break;            
        };
        
    }

    //Metodo que busca una cancion por el valor del usuario de busqueda(clase8 25 min)


    /*
    
    
    
    */


    cambiarPortada() {
        console.log('hace falta?')
        /* 
        const cover = document.getElementById('cover')
        cover.src = this.currentSong.cover
        */
    }

    //Reproducir cancion
   /*  play() {
        this.audio.src =  this.currentSong.urlSong;
        this.audio.play();            
    };  */

    play() {
        if (this.currentSong.urlSong !== undefined && this.isPause== false) {
            this.audio.src = this.currentSong.urlSong;
            this.audio.play();
            this.cambiarPortada();//-----------------------cambia portada
        } else {
            this.audio.play();
            this.isPause = true;
        };
    };


    //Reproducir cancion - solo como etiqueta de audio
   /*  play() {
        //console.log(this.currentSong)
        this.mostrarCancionActual();
        let audioActual = document.getElementById('audioCancion');
        let playBtn = document.getElementById('play');
        playBtn.addEventListener('click', () => {
            console.log('estoy reproduciendo')
            let audio = new Audio(this.currentSong.urlSong)
            audioActual.src = audio
            audio.play();
        });
    };  */


    //Pausar cancion
    pause() {
        let pauseBtn = document.getElementById('pause');
        pauseBtn.addEventListener('click', () => {
            console.log('estoy pausando');
            //this.audio.pause()
            if (!this.audio.paused) { // Si el audio no está pausado, entonces lo pausa
                this.audio.pause();
            } else { // Si el audio está pausado, entonces lo reanuda
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
        let nextBtn = document.getElementById('next') 
        nextBtn.addEventListener('click', () => {
            console.log('paso a siguiente cancion')

    
        
           
        })
    } 
    

}



export let reproductor = new Reproductor(); 
export let favorites = new Playlist('Favoritos', [], 'shuffle');
export let miPlaylist = new Playlist('Favoritos', [], 'shuffle');


