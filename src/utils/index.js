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
  return (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122);
}

/**
 * Get a random number between min & max.
 */
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

/**
 * Splits single array of letters to array of words.
 * @param {array} arr - The words array to be splitted (e.g. ['H', 'i', ' ', 'm', 'a', 'n'].
 * @param {string} seperator - The string to be used to seperate the array (defaults to an empty string (' ')).
 * @returns {array} Array of words.
 */
function splitArrayWords(arr, seperator = ' ') {
  const words = arr.join('').split(seperator);
  return words;
}

/**
 * Creates an array of conceal characters instead of the word letters.
 * @param {string} word - The word to create the conceal array from.
 * @param {string} cocnealChar - The conceal character to swap the word's letter with.
 * @returns {array} The conceal word array.
 */
function createConcealArr(word, concealChar = '_') {
  const hiddenArray = [...word].map(letter => {
    if (isAlphabetical(letter)) {
      return concealChar;
    }
    // In case the character is non-alphabetical (such as '!'),
    // use it instead of hiding it.
    return letter;
  });

  return hiddenArray;
}

/**
 * Change the array elements position randomly.
 * @param {array} arr - The array to shuffle.
 * @returns {array} The shuffled array.
 */
function shuffleArray(arr) {
  const shuffledArr = [...arr].sort(() => Math.random() - 0.5);
  return shuffledArr;
}

export { isAlphabetical, isKeyCodeAlphabetical, getRandomInt, splitArrayWords, shuffleArray, createConcealArr };
