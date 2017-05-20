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
  replaceUnderscores,
  letterInWord,
  letterInArray,
  getIndiciesOfLetter
} from './Utils';

class App extends Component {
  constructor ({ match }) {
    super();
    this.state = {
      loadingAlbum: true
    };
    this.username = match.params.username;
    this.period = match.params.period;
    this.handleKeyboardPress = this.handleKeyboardPress.bind(this);
    this.handleLetterGuess = this.handleLetterGuess.bind(this);
    this.startNewGame = this.startNewGame.bind(this);
  }

  handleKeyboardPress (e) {
    const keyCode = e.charCode || e.which;

    // Checks if the game is in active state
    if (this.gameEnd() === false && this.state.loadingAlbum === false) {
      // Checks if the pressed key is alphabetical
      if (isKeyCodeAlphabetical(keyCode)) {
        const letter = String.fromCharCode(keyCode);
        this.handleLetterGuess(letter);
      }
    }

    // Restart game on enter press when the game ends
    if (keyCode === 13 && this.gameEnd()) {
      this.startNewGame();
    }
  }

  handleLetterGuess (letter) {
    const word = this.state.albumName;
    const guessedLetters = this.state.guessedLetters;
    
    // Check if user had already guessed the letter
    if (letterInArray(guessedLetters, letter)) {
      return;
    } 
    else {
      this.setState({
        guessedLetters: guessedLetters.concat(letter)
      });
      // Check if letter exists in word
      if (letterInWord(word, letter)) {
        // Replace the guessed letter in the underscores array
        const indicies = getIndiciesOfLetter(word, letter);
        const newHiddenLettersArr = replaceUnderscores(this.state.hiddenLettersArr, letter, indicies);

        this.setState({
          hiddenLettersArr: newHiddenLettersArr
        });
      } else {
        this.setState({
          lives: this.state.lives - 1
        })
      }
    }    
  }

  gameWin () {
    return this.isAlbumNameGuessed();
  }

  gameLose () {
    return this.state.lives === 0;
  }

  gameEnd () {
    return this.gameWin() || this.gameLose();
  }

  isAlbumNameGuessed () {
    if (this.state.hiddenLettersArr.indexOf('_') === -1) {
      return true;
    }
    return false;
  }

  setNewAlbum () {
    this.setState({
      loadingAlbum: true
    });

    getAlbum(this.username, this.period)    
      .then(albumInfo => {
        this.setState({
          loadingAlbum: false,
          ...albumInfo
        });
      })
      .catch(err => console.log(err));
  }

  startNewGame () {    
    this.setState({
      guessedLetters: [],
      lives: 4,
    });

    this.setNewAlbum();
  }

  gameEndMessage() {
    if (this.gameWin()) {
      return <h1>You won! 🎉</h1>;
    }
    
    if (this.gameLose()) {
      return <h1>You lost. 🤧</h1>;
    }
    
    return null;
  }

  playAgainBtn () {
    if (this.gameEnd()) {
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
    window.addEventListener('keydown', this.handleKeyboardPress);
  }

  render() {
    if (!this.state.albumName) {
      return <h1 className='app'>Loading..</h1>
    }

    return (
      <div className='game'>
        <Artwork img={ this.state.albumImg } blurLevel={ this.state.lives * 10 } gameEnd={this.gameEnd()}/>
        <Word hiddenLetters={ this.gameEnd() ? this.state.albumNameArr : this.state.hiddenLettersArr } />
        <div className='game-stats'>
          <GuessedLetters letters={ this.state.guessedLetters } />
          <Hearts lives={ this.state.lives } />
        </div>
        { this.gameEndMessage() }
        { this.playAgainBtn() }
        <Keyboard onPress={ this.handleLetterGuess } />
      </div>
    );
  }
}

export default App;
