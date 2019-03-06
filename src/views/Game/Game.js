import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Hangman from 'hangman-game-engine';
import ReactLoading from 'react-loading';

import Artwork from '../../components/Artwork';
import Word from '../../components/Word';
import GuessedLetters from '../../components/GuessedLetters';
import Button from '../../components/Button';

import Keyboard from '../../components/Keyboard';
import Hearts from '../../components/Hearts';
import ProgressBar from '../../components/Progress';

import { isKeyCodeAlphabetical, getRandomInt } from '../../utils';
import { getAlbums } from '../../api';
import './Game.css';

class Game extends Component {
  state = {
    loadingAlbum: true,
    error: null,
    currentAlbum: {},
    currentGame: {}
  };

  albums = [];

  componentDidMount() {
    const { service, location, history } = this.props;
    if (service === 'spotify' && location.hash === '') history.push('/');
    if (service === 'spotify') {
      // Grab access token from url
      const parsedURL = queryString.parse(location.hash);
      this.getAlbumList('spotify', parsedURL.access_token);
    } else {
      const musicKit = window.MusicKit.getInstance();
      musicKit.authorize().then(() => {
        this.getAlbumList('appleMusic');
      });
    }

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

  async getAlbumList(service, token) {
    try {
      const albums = await getAlbums(service, token);
      this.albums = albums;
      this.setNewAlbum();
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  async setNewAlbum() {
    this.setState({ loadingAlbum: true });
    const album = this.albums[getRandomInt(0, this.albums.length - 1)];

    try {
      // Long album names breaks the UI.
      if (album.name.length > 30) {
        return this.setNewAlbum();
      }

      const currentGame = new Hangman(album.name);

      // If an album name does not contain alphabetical letters (e.g. only numbers), reload a new album.
      if (currentGame.hiddenWord.indexOf('_') === -1) {
        return this.setNewAlbum();
      }

      this.setState({ currentGame, loadingAlbum: false });
      // Delay the album update so the blur effect will take place after the artwork changes.
      setTimeout(() => this.setState({ currentAlbum: album }), 425);
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  handleKeyboardPress = event => {
    const keyCode = event.which;

    if (isKeyCodeAlphabetical(keyCode) && this.isGameActive()) {
      const letter = String.fromCharCode(keyCode);
      this.handleLetterPress(letter);
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
      if (currentGame.status === 'LOST') {
        currentGame.revealHiddenWord();
      }
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
        <div className="game-top-bar">
          <Hearts lives={4 - this.state.currentGame.failedGuesses} />
          <ProgressBar type="thin" total={152} progress={53} style={{ width: ' 10px ' }} />
        </div>
        {/* <div className="game-stage">
          <Artwork
            img={this.state.currentAlbum.image}
            blurLevel={(4 - this.state.currentGame.failedGuesses) * 5}
            gameEnd={this.gameEnd()}
          />
          <Word hiddenLetters={this.state.currentGame.hiddenWord} />
        </div>
        <div className="game-stats">
          <Hearts lives={4 - this.state.currentGame.failedGuesses} />
          <GuessedLetters letters={this.state.currentGame.failedLetters} />
        </div>
        <Keyboard
          onPress={this.handleLetterPress}
          guessedLetters={this.state.currentGame.guessedLetters}
          failedLetters={this.state.currentGame.failedLetters}
          gameStatus={this.state.currentGame.status}
          startNewGame={this.startNewGame}
          loadingAlbum={this.loadingAlbum}
        /> */}
      </div>
    );
  }
}

export default Game;
