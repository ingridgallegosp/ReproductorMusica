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
            newSong(nombre1, author1, duracion1, album1, año1, genero1, letra1, cover1, '/assets/songs/1.mp3'),
            newSong(nombre2, author2, duracion2, album2, año2, genero2, letra2, cover2, '/assets/songs/2.mp3'),
            newSong(nombre3, author3, duracion3, album3, año3, genero3, letra3, cover3, '/assets/songs/3.mp3'),
            newSong(nombre4, author4, duracion4, album4, año4, genero4, letra4, cover4, '/assets/songs/4.mp3'),
            newSong(nombre5, author5, duracion5, album5, año5, genero5, letra5, cover5, '/assets/songs/5.mp3'),
        ] 
    };

    //Metodo que muestra los nombres de canciones
    mostrarCanciones() {
        let canciones = document.getElementById()
        this.catalogodeCanciones.forEach(song =>
            canciones.innerHTML += `<p class='cancion'>${song.nombre}</p>`
        )
    };

    //Metodo que busca una cancion por su nombre
    buscarCancion(songName) {
        return this.catalogodeCanciones.find(song => song.name === songName)
    };



    //Reproducir cancion
    play() {
        let audio = new Audio(this.currentSong.urlSong)
        audio.play()
    };


    //Pausar cancion
    pause() {
        let pauseBtn = document.getElementById('pause')
        pauseBtn.addEventListener('click', () => {
            let currentSong = this.getCurrentSong()
            let audio = new Audio(urrentSong.urlSong)
            audio.pause()
        })
    };

    //Detener cancion
    stop() {
        let stopBtn = document.getElementById('stop')
        stopBtn.addEventListener('click', () => {
            let currentSong = this.getCurrentSong()
            let audio = new Audio(urrentSong.urlSong)
            audio.pause()
            audio.currentTime = 0;
        })
    };
    
}

/* let reproductor = new Reproductor();
console.log(reproductor.buscarCancion(songName, 'cancion1')) */