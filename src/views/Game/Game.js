import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Game.css';
import '../../assets/buttons.css';

import Artwork from '../../components/Artwork';
import Word from '../../components/Word';
import GuessedLetters from '../../components/GuessedLetters';
import Keyboard from '../../components/Keyboard';
import Hearts from '../../components/Hearts';

import {
  getAlbum,
  isKeyCodeAlphabetical,
  replaceUnderscores,
  letterInWord,
  letterInArray,
  getIndiciesOfLetter
} from '../../utils';

class Game extends Component {
  state = {
    loadingAlbum: true,
    error: null,
    guessedLetters: [],
    lives: 4
  };

  username = this.props.username || this.props.match.params.username;
  period = this.props.period || this.props.match.params.period;
  hideArtwork = this.props.hideArtwork;

  componentDidMount() {
    this.startNewGame();
    window.addEventListener('keydown', this.handleKeyboardPress);
    if (window.ga) {
      window.ga('set', 'page');
      window.ga('send', 'pageview', window.location.pathname);
    }
  }

  componentWillUnmount() {
    // Remove event listener on page redirection
    window.removeEventListener('keydown', this.handleKeyboardPress);
  }

  async setNewAlbum() {
    this.setState({ loadingAlbum: true });

    try {
      const albumInfo = await getAlbum(this.username, this.period);

      // If an album name does not contain alphabetical letters (e.g. only numbers), reload a new album.
      if (albumInfo.hiddenLettersArr.indexOf('_') === -1) {
        return this.setNewAlbum();
      }

      this.setState({ loadingAlbum: false, ...albumInfo });
    } catch (err) {
      this.setState({ error: `${err}.` });
    }
  }

  handleKeyboardPress = e => {
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
  };

  handleLetterGuess = letter => {
    const { guessedLetters, hiddenLettersArr, albumName: word } = this.state;

    // Check if user had already guessed the letter
    if (letterInArray(guessedLetters, letter)) {
      return;
    } else {
      // Add the letter to the guessed letters array
      this.setState({
        guessedLetters: guessedLetters.concat(letter)
      });
      // Check if letter exists in word
      if (letterInWord(word, letter)) {
        // Replace the guessed letter in the underscores array
        const indicies = getIndiciesOfLetter(word, letter);
        const newHiddenLettersArr = replaceUnderscores(hiddenLettersArr, letter, indicies);

        this.setState({
          hiddenLettersArr: newHiddenLettersArr
        });
      } else {
        this.setState({
          lives: this.state.lives - 1
        });
      }
    }
  };

  gameWin() {
    return this.isAlbumNameGuessed();
  }

  gameLose() {
    return this.state.lives === 0;
  }

  gameEnd() {
    return this.gameWin() || this.gameLose();
  }

  isAlbumNameGuessed() {
    if (this.state.hiddenLettersArr && this.state.hiddenLettersArr.indexOf('_') === -1) {
      return true;
    }
    return false;
  }

  startNewGame = () => {
    this.setState({
      guessedLetters: [],
      lives: 4
    });

    this.setNewAlbum();
  };

  gameEndMessage() {
    if (this.gameWin()) {
      return (
        <h1 className="game-status-msg">
          You won!{' '}
          <span role="img" aria-label="Party Popper">
            🎉
          </span>
        </h1>
      );
    }

    if (this.gameLose()) {
      return (
        <h1 className="game-status-msg">
          You lost.{' '}
          <span role="img" aria-label="Sneezing">
            🤧
          </span>
        </h1>
      );
    }

    return null;
  }

  playAgainBtn() {
    if (this.gameEnd()) {
      return (
        <button onClick={this.startNewGame} className="pure-button pure-button-primary">
          Play Again
        </button>
      );
    }
    return null;
  }

  render() {
    if (this.state.error) {
      return (
        <div>
          <h1>{this.state.error}</h1>
          <Link to="/">
            <button className="pure-button-primary pure-button">
              Try again?{' '}
              <span role="img" aria-label="Ogre">
                👹
              </span>
            </button>
          </Link>
        </div>
      );
    }

    if (!this.state.albumName) {
      return <h1 className="app">Loading..</h1>;
    }

    return (
      <div className="game">
        <Artwork
          img={this.state.albumImg}
          blurLevel={this.state.lives * 10}
          gameEnd={this.gameEnd()}
          hidden={this.hideArtwork}
        />
        <Word
          hiddenLetters={this.gameEnd() ? this.state.albumNameArr : this.state.hiddenLettersArr}
        />
        <div className="game-stats">
          <GuessedLetters letters={this.state.guessedLetters} />
          <Hearts lives={this.state.lives} />
        </div>
        {this.gameEndMessage()}
        {this.playAgainBtn()}
        <Keyboard onPress={this.handleLetterGuess} />
        <Link className="game-change-settings-link" to="/">
          Settings
        </Link>
      </div>
    );
  }
}

export default Game;
