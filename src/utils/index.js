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

export { isAlphabetical, isKeyCodeAlphabetical, getRandomInt, splitArrayWords };
