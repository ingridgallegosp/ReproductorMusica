// Función para filtrar canciones usando una expresión regular
export const filterSongsByRegex = (array, regex) => {
    return array.filter(element => regex.test(element));
};

export const filter = () => { console.log('la importacion de funciones esta ok') }

class Song {
    constructor(nombre, author, duracion, album, año, genero, letra, cover, urlSong) {
        this.nombre = nombre;
        this.author = author;
        this.duracion = duracion;
        this.album = album;
        this.año = año;
        this.genero = genero;
        this.letra = letra;
        this.cover = cover;
        this.urlSong = urlSong;
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


class Playlist{
    constructor(nombre, listaCanciones, ordenEscucha) {
        this.nombre = nombre;
        this.listaCanciones = listaCanciones;
        this.ordenordenEscucha =ordenEscucha;
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

    addSongToPlaylist(){
         this.listaCanciones.push(song)
    }

    removeSongFromPlaylist() {
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
        this.catalogodeCanciones = [
            new Song('nombre1', 'author1', 'duracion1', 'album1', 'año1', 'genero1', '/assets/covers/cover1', '/assets/songs/1.mp3'),
            new Song('nombre2', 'author2', 'duracion2', 'album2', 'año2', 'genero2', '/assets/covers/cover2', '/assets/songs/2.mp3'),
            new Song('nombre3', 'author3', 'duracion3', 'album3', 'año3', 'genero3', '/assets/covers/cover3', '/assets/songs/3.mp3'),
            new Song('nombre4', 'author4', 'duracion4', 'album4', 'año4', 'genero4', '/assets/covers/cover4', '/assets/songs/4.mp3'),
            new Song('nombre5', 'author5', 'duracion5', 'album5', 'año5', 'genero5', '/assets/covers/cover5', '/assets/songs/5.mp3'),
        ] 

        this.mostrarCanciones();

        this.play.bind(this);
/*         playBtn.addEventListener('click', this.play, false);
 */
        this.currentSong = this.catalogodeCanciones[0];
    };

    //Metodo que muestra los nombres de canciones en reproductor
    mostrarCanciones() {
        let canciones = document.getElementById('nombreCancion')
        this.catalogodeCanciones.forEach(song =>
            canciones.innerHTML += `<p class='cancion'>${song.nombre}</p>`
        )
    };

    //Metodo que busca una cancion por su nombre
    buscarCancion(songName) {
        return this.catalogodeCanciones.find(song => song.nombre === songName)
    };

    //Metodo que busca el autor de una cancion 
    buscarCancion(songAuthor) {
        return this.catalogodeCanciones.find(song => song.author === songAuthor)
    };

    //Reproducir cancion
    play() {
        let playBtn = document.getElementById('play');
        playBtn.addEventListener('click', () => { 
            console.log('estoy reproduciendo')
        })
        /* let audio = new Audio(this.currentSong.urlSong)
        audio.play() */
    };

    //Pausar cancion
    pause() {
        let pauseBtn = document.getElementById('pause') 
        pauseBtn.addEventListener('click', () => {
            console.log('estoy pausando')
            
            /* let currentSong = this.getCurrentSong()
            let audio = new Audio(urrentSong.urlSong)
            audio.pause() */
        })
        
    };

    //Detener cancion
    stop() {
        let stopBtn = document.getElementById('stop')
        stopBtn.addEventListener('click', () => {
            console.log('estoy detenido')
            /* let currentSong = this.getCurrentSong()
            let audio = new Audio(urrentSong.urlSong)
            audio.pause()
            audio.currentTime = 0; */
        })
        
    };
    
    //Mutear
    mute() {

        let muteBtn = document.getElementById('mute') 
        muteBtn.addEventListener('click', () => {
            console.log('estoy muteado')
            
            /* let currentSong = this.getCurrentSong()
            let audio = new Audio(urrentSong.urlSong)
            audio.pause() */
        })
        
    }

    //Siguiente cancion
    next() {
        let nextBtn = document.getElementById('next') 
        nextBtn.addEventListener('click', () => {
            console.log('paso a siguiente cancion')
            
            /* let currentSong = this.getCurrentSong()
            let audio = new Audio(urrentSong.urlSong)
            audio.pause() */
        })
        
    }
}

let reproductor = new Reproductor(); 
//console.log(reproductor.buscarCancion(songName, 'cancion1'))
let favorites = new Playlist('Favoritos', [], 'shuffle');
let miPlaylist = new Playlist('Favoritos', [], 'shuffle');

reproductor.buscarCancion('cancion1')
reproductor.play()
reproductor.mute()
reproductor.pause()
reproductor.stop()
reproductor.next()