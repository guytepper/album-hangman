import React, { Component } from 'react';

import './App.css';
import './assets/buttons.css';

import Artwork from './components/Artwork';
import Word from './components/Word';
import GuessedLetters from './components/GuessedLetters';
import Keyboard from './components/Keyboard';
import Hearts from './components/Hearts';

import {
  getAlbum,
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

    if ( isKeyCodeAlphabetical(keyCode) && this.state.GAME_END != true ) {
      const letter = String.fromCharCode(keyCode);
      this.handleLetterGuess(letter);
    }
  }

  handleLetterGuess (letter) {
    const word = this.state.ALBUM_NAME;
    const GUESSED_LETTERS = this.state.GUESSED_LETTERS;

    // Check if user had already guessed the letter
    if ( !letterInArray(GUESSED_LETTERS, letter) ) {
      this.setState({
        GUESSED_LETTERS: GUESSED_LETTERS.concat([letter])
      });

      // Check if letter exists in word
      if ( letterInWord(word, letter) ) {
        // Replace the guessed letter in the underscores array
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
  }

  isAlbumNameGuessed () {
    if (this.state.HIDDEN_LETTERS_ARRAY.indexOf('_') === -1) {
      return true;
    }
    return false;
  }

  setNewAlbum () {
    getAlbum(this.username)
      .then(albumInfo => {
        this.setState(albumInfo);
      })
      .catch(err => console.log(err));
  }

  startNewGame () {
    this.state = {
      GUESSED_LETTERS: [],
      LIVES: 4,
      GAME_END: false
    };

    this.setNewAlbum();
  }

  gameEndMessage() {
    if ( this.state.GAME_WIN === true ) {
      return <h1>'You won!'</h1>;
    }
    
    if ( this.state.GAME_LOST === true) {
      return <h1>'You lost.'</h1>;
    }
    
    return '';
  }

  playAgainBtn () {
    if (this.state.GAME_END) {
      return (
        <button onClick={this.startNewGame} className='pure-button pure-button-primary'>
          Play Again
        </button>
      )
    }
    return null;
  }

  componentDidMount() {
    this.startNewGame();
    window.addEventListener('keydown', this.keyboardPress);
  }

  render() {
    if (!this.state.ALBUM_NAME) {
      return <h1 className='app'>Loading..</h1>
    }

    if (this.state.LIVES === 0) {
      this.state.GAME_END = true;
      this.state.GAME_LOST = true;
    }

    if (this.isAlbumNameGuessed()) {
      this.state.GAME_END = true;
      this.state.GAME_WIN = true;
    }


    return (
      <div className='game'>
        <Artwork lives={ this.state.LIVES } img={ this.state.ALBUM_IMG } GAME_END={this.state.GAME_END}/>
        <Word hiddenLetters={ this.state.HIDDEN_LETTERS_ARRAY } />
        <div className='game-stats'>
          <GuessedLetters letters={ this.state.GUESSED_LETTERS } />
          <Hearts lives={ this.state.LIVES } />
        </div>
        { this.gameEndMessage() }
        { this.playAgainBtn() }
        {/*<Keyboard onPress={ this.handleLetterGuess } />*/}
      </div>
    );
  }
}

export default App;
