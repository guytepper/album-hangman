import * as Utils from './Utils';


Game.prototype.keyboardPress = function(e) {
  const keyCode = e.charCode || e.which;
  if ( (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) ) {
    const char = String.fromCharCode(keyCode);
    if ( this.letterInWord(char) ) {
      const indicies = this.getIndiciesOfLetter(char);
      this.HIDDEN_LETTERS_ARRAY = this.replaceUnderscore(char, indicies);
      this.updateHiddenWords(this.HIDDEN_LETTERS_ARRAY);
    }
  }
}

export { Game };
