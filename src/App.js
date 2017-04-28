import React, { Component } from 'react';
import './App.css';
import Word from './components/Word';
import {
  isKeyCodeAlphabetical,
  createUnderscoresArr,
  replaceUnderscores,
  letterInWord,
  letterInArray,
  getIndiciesOfLetter,
} from './Utils';
import Word from './Word';

// Temporary constants
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
      LIVES: 4,
    }
    this.keyboardPress = this.keyboardPress.bind(this);
  }

  keyboardPress (e) {
    const word = this.state.ALBUM_NAME;
    const GUESSED_LETTERS = this.state.GUESSED_LETTERS;
    const keyCode = e.charCode || e.which;
    
    if ( isKeyCodeAlphabetical(keyCode) ) {
      const letter = String.fromCharCode(keyCode);

      if ( !letterInArray(GUESSED_LETTERS, letter) ) {
        this.setState({
          GUESSED_LETTERS: GUESSED_LETTERS.concat([letter])
        });

        if ( letterInWord(word, letter) ) {
          const indicies = getIndiciesOfLetter(word, letter);
          const newHiddenLettersArr = replaceUnderscores(this.state.HIDDEN_LETTERS_ARRAY, letter, indicies);
          
          this.setState({
            HIDDEN_LETTERS_ARRAY: newHiddenLettersArr
          });
        }
        else {
          this.setState({
            LIVES: this.state.LIVES - 1
          })
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
        <Word hiddenLetters={ this.state.HIDDEN_LETTERS_ARRAY } />
        <code>
          <pre>
            { JSON.stringify(this.state.GUESSED_LETTERS, null, 4) }
          </pre>
        </code>
        <h3>{ this.state.LIVES }</h3>
      </div>
    );
  }
}

export default App;
