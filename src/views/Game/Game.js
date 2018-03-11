import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hangman from 'hangman-game-engine';

import './Game.css';
import '../../assets/buttons.css';

import Artwork from '../../components/Artwork';
import Word from '../../components/Word';
import GuessedLetters from '../../components/GuessedLetters';
import Keyboard from '../../components/Keyboard';
import Hearts from '../../components/Hearts';

import { getAlbum, isKeyCodeAlphabetical } from '../../utils';

class Game extends Component {
  state = {
    loadingAlbum: true,
    error: null,
    currentGame: {}
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
      const currentGame = new Hangman(albumInfo.name);

      // If an album name does not contain alphabetical letters (e.g. only numbers), reload a new album.
      if (currentGame.hiddenWord.indexOf('_') === -1) {
        return this.setNewAlbum();
      }

      this.setState({ currentGame, currentAlbum: albumInfo, loadingAlbum: false });
    } catch (err) {
      this.setState({ error: `${err}.` });
    }
  }

  handleKeyboardPress = e => {
    const { currentGame, loadingAlbum } = this.state;
    const keyCode = e.charCode || e.which;

    // Checks if the game is in active state
    if (currentGame.status === 'IN_PROGRESS' && loadingAlbum === false) {
      // Checks if the pressed key is alphabetical
      if (isKeyCodeAlphabetical(keyCode)) {
        const letter = String.fromCharCode(keyCode);
        currentGame.guess(letter);
      }
    }

    // Restart game on enter press when the game ends
    if (keyCode === 13 && currentGame.status !== 'IN_PROGRESS') {
      this.startNewGame();
    }
  };

  startNewGame = () => {
    this.setNewAlbum();
  };

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

  playAgainBtn() {
    const { currentGame } = this.state;
    if (currentGame.status !== 'IN_PROGRESS') {
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

    if (!this.state.loadingAlbum) {
      return <h1 className="app">Loading..</h1>;
    }

    return (
      <div className="game">
        <Artwork
          img={this.state.currentAlbum.image}
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
