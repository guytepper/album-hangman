import React, { Component } from 'react';
import axios from 'axios';

import './App.css';

import Artwork from './components/Artwork';
import Word from './components/Word';
import GuessedLetters from './components/GuessedLetters';
import Keyboard from './components/Keyboard';

import {
  isKeyCodeAlphabetical,
  createUnderscoresArr,
  replaceUnderscores,
  letterInWord,
  letterInArray,
  getIndiciesOfLetter,
  getRandomInt
} from './Utils';

class App extends Component {
  constructor ({ match }) {
    super();
    this.state = {};
    this.username = match.params.username;
    this.keyboardPress = this.keyboardPress.bind(this);
    this.handleLetterGuess = this.handleLetterGuess.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  keyboardPress (e) {
    const keyCode = e.charCode || e.which;
    
    if ( isKeyCodeAlphabetical(keyCode) ) {
      const letter = String.fromCharCode(keyCode);
      this.handleLetterGuess(letter);
    }
  }

  isAlbumNameGuessed () {
    if (this.state.HIDDEN_LETTERS_ARRAY.indexOf('_') === -1) {
      return true;
    }
    return false;
  }

  handleLetterGuess (letter) {
    const word = this.state.ALBUM_NAME;
    const GUESSED_LETTERS = this.state.GUESSED_LETTERS;

    // Check if user already guessed the letter
    if ( !letterInArray(GUESSED_LETTERS, letter) ) {
      this.setState({
        GUESSED_LETTERS: GUESSED_LETTERS.concat([letter])
      });

      // Check if letter exists in word
      if ( letterInWord(word, letter) ) {
        // Show the guessed letter in the underscores array
        const indicies = getIndiciesOfLetter(word, letter);
        const newHiddenLettersArr = replaceUnderscores(this.state.HIDDEN_LETTERS_ARRAY, letter, indicies);
        
        this.setState({
          HIDDEN_LETTERS_ARRAY: newHiddenLettersArr
        });
      }

      // Wrong guess
      else {
        this.setState({
          LIVES: this.state.LIVES - 1
        })
      }
    }

    if ( this.isAlbumNameGuessed() ) {
      this.setState({
        GAME_END: true,
        GAME_WIN: true
      })
    }
  }

  setNewAlbum () {
    axios.get(`http://ws.audioscrobbler.com/2.0/?method=user.gettopalbums&user=${this.username}&api_key=3fe5c70aa486800a6cfdb759ccd3e213&format=json`, { timeout: 5000 })
      .then(response => {
        const album = response.data.topalbums.album[getRandomInt(0, 50)];
        const ALBUM_NAME = album.name.toUpperCase();
        const ALBUM_NAME_ARR = [...ALBUM_NAME];
        const ALBUM_IMG = album.image[3]['#text'];
        const HIDDEN_LETTERS_ARRAY = createUnderscoresArr(ALBUM_NAME_ARR);

        this.setState({
          ALBUM_NAME,
          ALBUM_NAME_ARR,
          HIDDEN_LETTERS_ARRAY,
          ALBUM_IMG
        });
      })
      .catch(err => {
        console.log(err);
      })
  }

  startNewGame () {
    this.state = {
      GUESSED_LETTERS: [],
      LIVES: 4,
      GAME_END: false
    };
    this.setNewAlbum();
    window.addEventListener('keydown', this.keyboardPress);
  }

  playAgain () {
    if (this.state.GAME_END) {
      return (
        <button onClick={this.startNewGame} >
          Play Again
        </button>
      )
    }
    return null;
  }

  componentDidMount() {
    this.startNewGame();
  }

  render() {
    if (!this.state.ALBUM_NAME) {
      return <h1 className='app'>Loading..</h1>
    }

    let gameEndMessage = '';

    if (this.state.LIVES === 0) {
      this.state.GAME_END = true;
      window.removeEventListener('keydown', this.keyboardPress);
      gameEndMessage = 'You lost.';
    }

    if (this.isAlbumNameGuessed()) {
      gameEndMessage = 'You won!';
    }
    

    return (
      <div className='app'>
        <h1>Album Hangman</h1>
        <Artwork lives={ this.state.LIVES } img={ this.state.ALBUM_IMG } GAME_END={this.state.GAME_END}/>
        <Word hiddenLetters={ this.state.HIDDEN_LETTERS_ARRAY } />
        <GuessedLetters letters={ this.state.GUESSED_LETTERS } />
        <h3>Lives: { this.state.LIVES }</h3>
        <h1>{ gameEndMessage }</h1>
        { this.playAgain() }
        {/*<Keyboard onPress={ this.handleLetterGuess } />*/}
      </div>
    );
  }
}

export default App;
