// Función para filtrar canciones usando una expresión regular
export const filterSongsByRegex = (array, regex) => {
    return array.filter(element => regex.test(element));
};


export const filter = () => { console.log('la importacion de funciones esta ok') }