import { filter,  filterSongsByRegex  } from '/logic.js';

let songs = ["song1", "song2", "song3", "song4", "song5"];

const search = document.getElementById('search');
const searchBtn = document.getElementById('searchBtn'); 
const resultsContainer = document.getElementById('results');
const playlistContainer = document.getElementById('playlist');
const favoritesContainer = document.getElementById('favorites');

filter();
//Imprimir canciones
songs.forEach(
    song => {
        resultsContainer.innerHTML += `
            <li class="song">
                <p>${song}</p>
                <button>play</button>
                <button>like</button>
                <button>remove</button>
            </li >
        `
    }
);

//Filtrar busqueda
searchBtn.addEventListener('click', () => {
    let busqueda = search.value;
   
    const regExp = new RegExp(busqueda,'i');
    let cancionesFiltradas = filterSongsByRegex(songs, regExp);
    console.log(cancionesFiltradas)
    
    // Limpiamos el contenedor de resultados antes de agregar nuevos elementos
    resultsContainer.innerHTML = '';

    cancionesFiltradas.forEach(song => {
        resultsContainer.innerHTML += `
            <li class="song">
                <p>${song}</p>
                <button>play</button>
                <button>like</button>
                <button>remove</button>
            </li>
        `;
    });
});