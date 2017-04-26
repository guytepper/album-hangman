import React, { Component } from 'react';
import './App.css';
import {
  createUnderscoresArr,
  replaceUnderscores,
  letterInWord,
  getIndiciesOfLetter
} from './Utils';
import Word from './Word';

const ALBUM_NAME = 'Stadium Arcadium'.toUpperCase();
const ALBUM_NAME_ARR = [...this.ALBUM_NAME];
const HIDDEN_LETTERS_ARRAY = createUnderscoresArr(this.ALBUM_NAME_ARR);

class App extends Component {
  constructor () {
    super();
    this.keyboardPress = this.keyboardPress.bind(this);
  }
  keyboardPress (e) {
    const word = this.ALBUM_NAME;
    const keyCode = e.charCode || e.which;
    if ( (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) ) { // TODO: Move to helper function
      const char = String.fromCharCode(keyCode);
      if ( letterInWord(word, char) ) {
        const indicies = getIndiciesOfLetter(word, char);
        this.HIDDEN_LETTERS_ARRAY = replaceUnderscores(this.HIDDEN_LETTERS_ARRAY, char, indicies);
      }
    }
  }
  componentDidMount() {
    window.addEventListener('keydown', this.keyboardPress);
  }
  render() {
    return (
      <div>
        <code>
          <pre>
            { JSON.stringify(this.state.HIDDEN_LETTERS_ARRAY, null, 4) }
          </pre>
        </code>
        <Word hiddenLetters={ this.state.HIDDEN_LETTERS_ARRAY } />
      </div>
    );
  }
}

export default App;
