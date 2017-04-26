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
const ALBUM_NAME_ARR = [...ALBUM_NAME];
const HIDDEN_LETTERS_ARRAY = createUnderscoresArr(ALBUM_NAME_ARR);

class App extends Component {
  constructor () {
    super();
    this.state = {
      ALBUM_NAME,
      ALBUM_NAME_ARR,
      HIDDEN_LETTERS_ARRAY,
      GUESSED_LETTERS: [],
    }
    this.keyboardPress = this.keyboardPress.bind(this);
  }
  keyboardPress (e) {
    const word = this.state.ALBUM_NAME;
    const keyCode = e.charCode || e.which;
    if ( (keyCode >= 65 && keyCode <= 90) || (keyCode >= 97 && keyCode <= 122) ) { // TODO: Move to helper function
      const char = String.fromCharCode(keyCode);
      if ( this.state.GUESSED_LETTERS.indexOf(char) === -1 ) {
        this.state.GUESSED_LETTERS.push(char);
        if ( letterInWord(word, char) ) {
          const indicies = getIndiciesOfLetter(word, char);
          const newHiddenLettersArr = replaceUnderscores(this.state.HIDDEN_LETTERS_ARRAY, char, indicies);
          this.setState({
            HIDDEN_LETTERS_ARRAY: newHiddenLettersArr
          });
        }
        else {
          console.log('Wrong guess');
        }
      }
      else {
        console.log('Already guessed..');
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
