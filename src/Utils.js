import axios from 'axios';

/**
 * Check if a string is an alphabetical character
 */
function isAlphabetical(str) {
  if (str.match(/[a-z]/i)) {
    return true;
  }
  return false;
}

function isKeyCodeAlphabetical(keyCode) {
  return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122)
}

/**
 * Create an array of empty underscores according to
 * the album name letters.
 */
function createUnderscoresArr(name) {
   let hiddenArray = name.map(letter => {
     if (isAlphabetical(letter)) {
       return '_'
     }
     return letter;
   })

   return hiddenArray;
 }

 /**
  * Checks if a letter exists in a word
  */
 function letterInWord (word, letter) {
   return word.indexOf(letter) > -1;
 }

 /**
  * Checks if a letter exists in an array
  */
  function letterInArray (arr, letter) {
    return arr.indexOf(letter) > -1
  }

 /**
  * Returns the indicies of the letter in the string
  */
 function getIndiciesOfLetter (word, letter) {
   let indices = [];
   for (let i = 0; i < word.length; i++) {
     if (word[i] === letter) {
       indices.push(i);
     }
   }

   return indices;
 }

 /**
  * Replaces underscore with the guessed letter,
  * using the indicies of that letter in the word.
  */
 function replaceUnderscores (arr, letter, indicies) {
   indicies.forEach(index => arr[index] = letter);
   return arr;
 }

 /**
  * Get a random number between min & max.
  */
 function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Get album information from the Last.FM API, 
 * using the provided user information.
 */
function getAlbum(username, period = 'overall') {
  return new Promise((resolve, reject) => {
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&period=${period}&api_key=3fe5c70aa486800a6cfdb759ccd3e213&format=json`, { timeout: 5000 })
      .then(response => {
        const album = response.data.topalbums.album[getRandomInt(0, 50)];
        const ALBUM_NAME = album.name.toUpperCase();
        const ALBUM_NAME_ARR = [...ALBUM_NAME];
        const ALBUM_IMG = album.image[3]['#text'];
        const HIDDEN_LETTERS_ARRAY = createUnderscoresArr(ALBUM_NAME_ARR);

        resolve({
          ALBUM_NAME,
          ALBUM_NAME_ARR,
          HIDDEN_LETTERS_ARRAY,
          ALBUM_IMG
        });
      })
      .catch(err => reject(err))
  })
}

 export {
    isAlphabetical,
    isKeyCodeAlphabetical,
    createUnderscoresArr,
    replaceUnderscores,
    letterInWord,
    letterInArray,
    getIndiciesOfLetter,
    getRandomInt,
    getAlbum
  }
