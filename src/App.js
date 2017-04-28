import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Artwork from './components/Artwork';
import Word from './components/Word';
import GuessedLetters from './components/GuessedLetters';

import {
  isKeyCodeAlphabetical,
  createUnderscoresArr,
  replaceUnderscores,
  letterInWord,
  letterInArray,
  getIndiciesOfLetter,
} from './Utils';

// Temporary constants
const ALBUM_NAME = 'Stadium Arcadium'.toUpperCase();
const ALBUM_NAME_ARR = [...ALBUM_NAME];
const HIDDEN_LETTERS_ARRAY = createUnderscoresArr(ALBUM_NAME_ARR);

class App extends Component {
  constructor () {
    super();
    this.state = {
      ALBUM_IMG: null,
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
    axios.get('http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=Dobida&api_key=3fe5c70aa486800a6cfdb759ccd3e213&format=json')
      .then(response => {
        this.setState({
          ALBUM_IMG: response.data.topalbums.album[10].image[3]['#text']
        });
      })

    window.addEventListener('keydown', this.keyboardPress);
  }

  render() {
    return (
      <div className='app'>
        <h1>Album Hangman</h1>
        <Artwork img={ this.state.ALBUM_IMG } />
        <Word hiddenLetters={ this.state.HIDDEN_LETTERS_ARRAY } />
        <GuessedLetters letters={ this.state.GUESSED_LETTERS } />
        <h3>Lives: { this.state.LIVES }</h3>
      </div>
    );
  }
}

export default App;
