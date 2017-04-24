import * as Utils from './Utils';

/**
 * Generate a new word, attaches event listeners.
 */
function Game() {
  this.ALBUM_NAME = 'Stadium Arcadium';
  this.ALBUM_NAME_ARR = [...this.ALBUM_NAME];
  this.HIDDEN_LETTERS_ARRAY = Utils.createUnderscoresArr(this.ALBUM_NAME_ARR);
  window.addEventListener('keydown', this.keyboardPress.bind(this)); // TODO: Move this to another place, as this will be attached for each new game object.
}

/**
 * Checks if a letter exists in the word
 */
Game.prototype.letterInWord = function (letter) {
  return this.ALBUM_NAME.indexOf(letter) > -1;
}

/**
 * Returns the indicies of the letter in the string
 */
Game.prototype.getIndiciesOfLetter = function (letter) {
  const word = this.ALBUM_NAME;
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
Game.prototype.replaceUnderscore = function (letter, indicies) {
  const arr = this.HIDDEN_LETTERS_ARRAY;
  indicies.forEach(index => arr[index] = letter);
  return arr;
}

Game.prototype.keyboardPress = function(e) {
  const keyCode = e.charCode || e.which;
  if ( (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) ) {
    const char = String.fromCharCode(keyCode);
    if ( this.letterInWord(char) ) {
      const indicies = this.getIndiciesOfLetter(char);
      this.HIDDEN_LETTERS_ARRAY = this.replaceUnderscore(char, indicies);
    }
  }
}

export { Game };
