import { /* filter, */ filterSongsByRegex, reproductor, favorites, myPlaylist  } from '/logic.js';

let songs = reproductor.catalogodeCanciones;

const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn'); 
const resultsContainer = document.getElementById('results');
const playlistContainer = document.getElementById('playlist');
const favoritesContainer = document.getElementById('favorites');

//filter();

reproductor.play()
reproductor.mute()
reproductor.pause()
reproductor.stop()
reproductor.next() 
reproductor.buscarCancion()
reproductor.mostrarCancionActual()
reproductor.mostrarCanciones()
reproductor.inicializarControles()



    

favorites
myPlaylist 


if (localStorage.getItem("isLogged")){
    
    const logoutBtn = document.getElementById("logout")
    logoutBtn.addEventListener("click",()=>{
        localStorage.removeItem("isLogged")
        window.location.href = "/pages/logIn.html"
    })
}


//Imprimir todas las canciones
/* songs.forEach(song => {
    resultsContainer.innerHTML += `
        <li class="song">
            <p>${song.nombre}</p>
            <button class='playSongBtn'>play</button>
            <button>like</button>
            <button>add</button>
        </li >
    `;
}); */

//Filtrar busqueda
/* searchBtn.addEventListener('click', () => {
    let busqueda = search.value;
   
    const regExp = new RegExp(busqueda,'i');
    let cancionesFiltradas = filterSongsByRegex(songs, regExp);
    //console.log(cancionesFiltradas)
    //Limpiamos el contenedor de resultados antes de agregar nuevos elementos
    resultsContainer.innerHTML = '';

    cancionesFiltradas.forEach(song => {
        resultsContainer.innerHTML += `
            <li class="song">
                <p>${song.nombre}</p>
                <button class='playSongBtn'>play</button>
                <button class='likeSongBtn'>like</button>
                <button class='addSongBtn'>add</button>
            </li >
        `;
    });
}); */


