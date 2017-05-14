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
    this.state = {
      LOADING_ALBUM: true
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
    if ( this.state.GAME_END === false && this.state.LOADING_ALBUM === false ) {
      // Checks if the pressed key is alphabetical
      if ( isKeyCodeAlphabetical(keyCode) ) {
        const letter = String.fromCharCode(keyCode);
        this.handleLetterGuess(letter);
      }
    }

    // Restart game on enter press when the game ends
    if (keyCode === 13 && this.state.GAME_END === true) {
      this.startNewGame();
    }
  }

  handleLetterGuess (letter) {
    const word = this.state.ALBUM_NAME;
    const GUESSED_LETTERS = this.state.GUESSED_LETTERS;
    
    // Check if user had already guessed the letter
    if (letterInArray(GUESSED_LETTERS, letter)) {
      return;
    } 
    else {
      this.setState({
        GUESSED_LETTERS: GUESSED_LETTERS.concat(letter)
      });
      // Check if letter exists in word
      if ( letterInWord(word, letter) ) {
        // Replace the guessed letter in the underscores array
        const indicies = getIndiciesOfLetter(word, letter);
        const newHiddenLettersArr = replaceUnderscores(this.state.HIDDEN_LETTERS_ARRAY, letter, indicies);

        this.setState({
          HIDDEN_LETTERS_ARRAY: newHiddenLettersArr
        });
      } else {
        this.setState({
          LIVES: this.state.LIVES - 1
        })
      }
    } 

    // Check for game lose / win
    if (this.state.LIVES === 0) {
      this.setState({
        GAME_END: true,
        GAME_LOSE: true
      })
    }
    else if (this.isAlbumNameGuessed()) {
      this.setState({
        GAME_END: true,
        GAME_WIN: true
      })
    }
  }

  isAlbumNameGuessed () {
    if (this.state.HIDDEN_LETTERS_ARRAY.indexOf('_') === -1) {
      return true;
    }
    return false;
  }

  setNewAlbum () {
    this.setState({
      LOADING_ALBUM: true
    });

    getAlbum(this.username, this.period)    
      .then(albumInfo => {
        this.setState({
          LOADING_ALBUM: false,
          ...albumInfo
        });
      })
      .catch(err => console.log(err));
  }

  startNewGame () {    
    this.setState({
      GUESSED_LETTERS: [],
      LIVES: 4,
      GAME_END: false,
      GAME_WIN: false,
      GAME_LOSE: false
    });

    this.setNewAlbum();
  }

  gameEndMessage() {
    if (this.state.GAME_WIN) {
      return <h1>You won! 🎉</h1>;
    }
    
    if (this.state.GAME_LOSE) {
      return <h1>You lost. 🤧</h1>;
    }
    
    return null;
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
    window.addEventListener('keydown', this.handleKeyboardPress);
  }

  render() {
    if (!this.state.ALBUM_NAME) {
      return <h1 className='app'>Loading..</h1>
    }

    return (
      <div className='game'>
        <Artwork img={ this.state.ALBUM_IMG } blurLevel={ this.state.LIVES * 10 } GAME_END={this.state.GAME_END}/>
        <Word hiddenLetters={ this.state.HIDDEN_LETTERS_ARRAY } />
        <div className='game-stats'>
          <GuessedLetters letters={ this.state.GUESSED_LETTERS } />
          <Hearts lives={ this.state.LIVES } />
        </div>
        { this.gameEndMessage() }
        { this.playAgainBtn() }
        <Keyboard onPress={ this.handleLetterGuess } />
      </div>
    );
  }
}

export default App;
