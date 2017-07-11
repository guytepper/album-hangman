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

/**
 * Checks if the pressed key is alphabetical
 */ 
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
     // In case the character is non-alphabetical (such as '!'), 
     // use it instead of hiding it.
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
  return axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${username}&period=${period}&api_key=3fe5c70aa486800a6cfdb759ccd3e213&format=json`, { timeout: 5000 })
    .then(response => {
      if (response.data.error) throw response.data.message;
      const albumsArr = response.data.topalbums.album; // array of albums
      if (response.data.topalbums.album.length === 0) throw 'No albums found for the time period';
      const album = album[getRandomInt(0, 50)];
      const albumName = album.name.toUpperCase();
      const albumNameArr = [...albumName];
      const albumImg = album.image[3]['#text'];
      const hiddenLettersArr = createUnderscoresArr(albumNameArr);

      return {
        album,
        albumName,
        albumNameArr,
        albumImg,
        hiddenLettersArr
      };
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
