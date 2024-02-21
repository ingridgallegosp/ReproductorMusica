import { filter, filterSongsByRegex  } from '/logic.js';


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
                <button>add</button>
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




/*next button
const nextButton = document.getElementById('next');

const songs = ['https://cdn.pixabay.com/audio/2021/11/01/audio_00fa5593f3.mp3',
  'https://cdn.pixabay.com/audio/2022/02/22/audio_c06fba1b22.mp3',
  'https://cdn.pixabay.com/audio/2021/10/22/audio_6642827492.mp3',
  'https://cdn.pixabay.com/audio/2022/04/12/audio_13feea552b.mp3',
  'https://cdn.pixabay.com/audio/2021/11/20/audio_a69b88e9f5.mp3'
]

let audio = new Audio()

nextButton.addEventListener('click', changeAudio);
audio.addEventListener('ended', changeAudio);

let index = 0

function changeAudio() {
  if (!audio.src) {
    audio.src = songs[index];
    audio.play();
  } else {
    if (index === songs.length - 1) {
      index = 0;
    } else {
      index++
    }
    audio.src = songs[index];
    audio.play()
  }

}*/

/*const audio = new Audio('https://cdn.pixabay.com/audio/2024/01/15/audio_9914e58808.mp3')
audio.volume = 0.1
audio.currentTime = 245

const input = document.getElementById('input')
const search = document.getElementById('search')
const play = document.getElementById('play')
const pause = document.getElementById('pause')
const mute = document.getElementById('mute')
const sound = document.getElementById('sound')

play.addEventListener('click', () => {
  audio.play()
})

pause.addEventListener('click', () => {
  audio.pause()
})

mute.addEventListener('click', () => {
  audio.volume = 0
})

sound.addEventListener('click', () => {
  audio.volume = 0.1
})

search.addEventListener('click', () => {
  audio.src = input.value
})

audio.addEventListener('ended', () => {
  alert('termino el audio, paso al siguiente')
  audio.src = 'https://cdn.pixabay.com/audio/2024/01/16/audio_e2b992254f.mp3'
  audio.play()
})

 */