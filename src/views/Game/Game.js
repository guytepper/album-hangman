import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hangman from 'hangman-game-engine';
import ReactLoading from 'react-loading';

import Artwork from '../../components/Artwork';
import Word from '../../components/Word';
import GuessedLetters from '../../components/GuessedLetters';
import Button from '../../components/Button';

import Keyboard from '../../components/Keyboard';
import Hearts from '../../components/Hearts';
import { isKeyCodeAlphabetical } from '../../utils';
import { getAlbums } from '../../api';
import './Game.css';

class Game extends Component {
  state = {
    loadingAlbum: true,
    error: null,
    currentAlbum: {},
    currentGame: {}
  };

  username = this.props.username || this.props.match.params.username;
  period = this.props.period || this.props.match.params.period;

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

      // Long album names breaks the UI.
      if (albumInfo.name.length > 30) {
        return this.setNewAlbum();
      }

      const currentGame = new Hangman(albumInfo.name);
      // If an album name does not contain alphabetical letters (e.g. only numbers), reload a new album.
      if (currentGame.hiddenWord.indexOf('_') === -1) {
        return this.setNewAlbum();
      }

      this.setState({ currentGame, currentAlbum: albumInfo, loadingAlbum: false });
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  handleKeyboardPress = event => {
    const { currentGame } = this.state;
    const keyCode = event.which;

    if (isKeyCodeAlphabetical(keyCode) && this.isGameActive()) {
      const letter = String.fromCharCode(keyCode);
      currentGame.guess(letter);
      if (currentGame.status === 'LOST') {
        currentGame.revealHiddenWord();
      }
      this.forceUpdate();
    }

    // Allow starting a new game when the current game has ended and ENTER key has been pressed.
    if (keyCode === 13 && this.gameEnd()) {
      this.startNewGame();
    }
  };

  handleLetterPress = letter => {
    const { currentGame } = this.state;

    if (this.isGameActive) {
      currentGame.guess(letter);
      this.forceUpdate();
    }
  };

  startNewGame = () => {
    this.setNewAlbum();
  };

  isGameActive = () => {
    const { currentGame, loadingAlbum } = this.state;
    return currentGame.status === 'IN_PROGRESS' && loadingAlbum === false;
  };

  // TODO: Move to another file.
  gameEndMessage() {
    const { currentGame } = this.state;
    if (currentGame.status === 'WON') {
      return (
        <h1 className="game-status-msg">
          You won!{' '}
          <span role="img" aria-label="Party Popper">
            🎉
          </span>
        </h1>
      );
    }

    if (currentGame.status === 'LOST') {
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

  playAgainBtn = () => {
    if (this.gameEnd()) {
      return (
        <Button onClick={this.startNewGame} loading={this.state.loadingAlbum}>
          Play Again
        </Button>
      );
    }
    return null;
  };

  gameEnd = () => {
    return this.state.currentGame.status !== 'IN_PROGRESS';
  };

  render() {
    if (this.state.error) {
      return (
        <div className="error-container">
          <h1>{this.state.error}</h1>
          <Link to="/">
            <Button>
              Try again?{' '}
              <span role="img" aria-label="Ogre">
                👹
              </span>
            </Button>
          </Link>
        </div>
      );
    }

    // Display loading only on initial load
    if (!this.state.currentAlbum.name) {
      return (
        <div className="loading-state">
          <ReactLoading type="bubbles" height={150} width={150} />
          <h1 style={{ marginTop: 0 }}>Loading...</h1>
        </div>
      );
    }

    return (
      <div className="game">
        <div className="game-stage">
          <Artwork
            img={this.state.currentAlbum.image}
            blurLevel={(4 - this.state.currentGame.failedGuesses) * 10}
            gameEnd={this.gameEnd()}
          />
          <Word hiddenLetters={this.state.currentGame.hiddenWord} />
        </div>
        <div className="game-stats">
          <Hearts lives={4 - this.state.currentGame.failedGuesses} />
          <GuessedLetters letters={this.state.currentGame.failedLetters} />
        </div>
        <div className="game-end-message">
          {this.gameEndMessage()}
          {this.playAgainBtn()}
        </div>
        <Keyboard onPress={this.handleLetterPress} />
      </div>
    );
  }
}

export default Game;
