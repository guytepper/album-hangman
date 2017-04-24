/**
 * Checks if a letter exists in the word
 */
function letterInWord(letter, word) {
  return word.indexOf(letter) > -1;
}

/**
 * Returns the indicies of the letter in the string
 */
function getIndiciesOfLetter(letter, word) {
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
function replaceUnderscore(arr, letter, indicies) {
  indicies.forEach(index => arr[index] = letter);
  return arr;
}

export {
  letterInWord,
  getIndiciesOfLetter,
  replaceUnderscore,
}
