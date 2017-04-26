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

 export {
    isAlphabetical,
    isKeyCodeAlphabetical,
    createUnderscoresArr,
    replaceUnderscores,
    letterInWord,
    getIndiciesOfLetter,
  }
