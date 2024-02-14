import { filter } from '/logic.js'

let songs = ["song1", "song2", "song3", "song4", "song5"]

const search = document.getElementById('search');
const resultsContainer = document.getElementById('results');
const playlistContainer = document.getElementById('playlist');
const favoritesContainer = document.getElementById('favorites');

filter()

songs.forEach(
    song => {
        resultsContainer.innerHTML += `
            <li class="song">
                <p>'${'hiii'}'</p>
                <button>play</button>
                <button>like</button>
                <button>remove</button>
            </li >
        `
    }
)