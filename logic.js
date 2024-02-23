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
            new Song(1,'nombre1', 'author1', 'duracion1', 'album1', 'año1', 'genero1', '/assets/covers/1.jpg', '/assets/songs/1.mp3'),
            new Song(2,'nombre2', 'author2', 'duracion2', 'album2', 'año2', 'genero2', '/assets/covers/2.jpg', '/assets/songs/2.mp3'),
            new Song(3,'nombre3', 'author3', 'duracion3', 'album3', 'año3', 'genero3', '/assets/covers/3.jpg', '/assets/songs/3.mp3'),
            new Song(4,'nombre4', 'author2', 'duracion4', 'album2', 'año2', 'genero2', '/assets/covers/2.jpg', '/assets/songs/4.mp3'),
            new Song(5,'nombre5', 'author5', 'duracion5', 'album5', 'año5', 'genero5', '/assets/covers/5.jpg', '/assets/songs/5.mp3'),
        ] 

        //this.mostrarCanciones(); //reproduce automatico
        this.currentSong = this.catalogodeCanciones[0];
        this.audio = new Audio();
        this.currentPlaylist = 'busqueda';

        this.miPlaylist = new Playlist('playlist');
        this.favorites = new Playlist('favorites');

        document.addEventListener('playsong', () => {
            this.currentSong = e.detail.song;
            this.play();
        })

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

    
    //Metodo que muestra los nombres de canciones en reproductor
    mostrarCanciones() {
            /* let canciones = document.getElementById('nombreCancion');
            this.catalogodeCanciones.forEach(song => {
                canciones.innerHTML += `<p class='cancion'>${song.nombre}</p>`
            }); */
    }; 


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
        if (this.currentSong.urlSong !== undefined) {
            this.audio.src = this.currentSong.urlSong;
            this.audio.play();
        } else {
            let id
            switch (this.currentPlaylist) {
                case 'favorites': id = document.getElementById('favorites');
                    break
                case 'busqueda': id = document.getElementById('results');
                    break
                case 'lista': id = document.getElementById('playlist');
                    break
            }
        this.currentSong = this.catalogodeCanciones.find(song => song.id === id);
        this.audio.src = this.currentSong.urlSong;
        this.audio.play();
        }
        this.cambiarPortada()
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
        let audioActual = document.getElementById('audioCancion');
        let pauseBtn = document.getElementById('pause');
        pauseBtn.addEventListener('click', () => {
            console.log('estoy pausando');
            
        });
    }

    //Detener cancion
    stop() {
        let stopBtn = document.getElementById('stop')
        stopBtn.addEventListener('click', () => {
            console.log('estoy detenido')
             
        })
        
    };
    
    //Mutear
    mute() {
        let muteBtn = document.getElementById('mute') 
        muteBtn.addEventListener('click', () => {
            console.log('estoy muteado')
            
        })
        
    }

    //Siguiente cancion
    next() {
        let nextBtn = document.getElementById('next') 
        nextBtn.addEventListener('click', () => {
            console.log('paso a siguiente cancion')
            
           
        })
    }
    
    /* loadSong(url) {
        this.audio.src = url;
        this.audio.play();
    } */
}



export let reproductor = new Reproductor(); 
export let favorites = new Playlist('Favoritos', [], 'shuffle');
export let miPlaylist = new Playlist('Favoritos', [], 'shuffle');


