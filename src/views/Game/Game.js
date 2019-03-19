import React, { Component } from 'react';
import queryString from 'query-string';
import { Link } from 'react-router-dom';
import Hangman from 'hangman-game-engine';
import ReactLoading from 'react-loading';

import Artwork from '../../components/Artwork';
import Word from '../../components/Word';
import Button from '../../components/Button';

import Keyboard from '../../components/Keyboard';
import GameHeader from '../../components/GameHeader';
import SettingsModal from '../../components/SettingsModal';

import { isKeyCodeAlphabetical, updateSavedAlbums, getSavedAlbums } from '../../utils';
import { getAlbums } from '../../api';
import './Game.css';

class Game extends Component {
  state = {
    loadingAlbum: true,
    error: null,
    currentAlbum: {},
    currentGame: {},
    displaySettings: false,
    totalAlbums: 0,
    pendingAlbums: [],
    guessedAlbums: []
  };

  componentDidMount() {
    const { service, location, history } = this.props;

    switch (service) {
      case 'spotify':
        const parsedURL = queryString.parse(location.hash);
        this.getAlbumList('spotify', parsedURL.access_token);
        break;
      case 'appleMusic':
        const musicKit = window.MusicKit.getInstance();
        musicKit.authorize().then(() => {
          this.getAlbumList('appleMusic');
        });
        break;
      case 'cache':
        const [pendingAlbums, guessedAlbums] = getSavedAlbums();
        const totalAlbums = pendingAlbums.length + guessedAlbums.length;
        this.setState({ pendingAlbums, guessedAlbums, totalAlbums }, this.setNewAlbum);
        break;
      default:
        history.push('/');
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
      const pendingAlbums = await getAlbums(service, token);
      this.setState({ pendingAlbums, totalAlbums: pendingAlbums.length }, () => this.setNewAlbum());
    } catch (err) {
      this.setState({ error: err.message });
    }
  }

  async setNewAlbum() {
    this.setState({ loadingAlbum: true });
    const album = this.state.pendingAlbums[0];
    const currentGame = new Hangman(album.name);
    this.setState({ currentGame, loadingAlbum: false });
    setTimeout(() => this.setState({ currentAlbum: album }), 425);
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
    const { pendingAlbums, guessedAlbums, currentGame } = this.state;
    if (currentGame.status === 'LOST') {
      pendingAlbums.push(pendingAlbums.shift());
    } else if (currentGame.status === 'WON') {
      guessedAlbums.push(pendingAlbums.shift());
    }
    // Update local storage
    updateSavedAlbums(pendingAlbums, guessedAlbums);
    this.setState({ guessedAlbums, pendingAlbums }, this.setNewAlbum);
  };

  setSettingsDisplay = displaySettings => {
    this.setState({ displaySettings });
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
          <h1>An error occured</h1>
          <Link to="/">
            <Button type="warning">Try again?</Button>
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
        {this.state.displaySettings && (
          <React.Fragment>
            <div className="overlay" />
            <SettingsModal className="settings-overlay" setSettingsDisplay={this.setSettingsDisplay} />
          </React.Fragment>
        )}
        <GameHeader
          setSettingsDisplay={this.setSettingsDisplay}
          currentGame={this.state.currentGame}
          totalAlbums={this.state.totalAlbums}
          albumsProgress={this.state.guessedAlbums.length}
        />
        <div className="game-stage">
          <div className="game-stage-album-info">
            <Artwork
              img={this.state.currentAlbum.image}
              blurLevel={(4 - this.state.currentGame.failedGuesses) * 5}
              gameEnd={this.gameEnd()}
            />
            <Word hiddenLetters={this.state.currentGame.hiddenWord} />
          </div>
          <Keyboard
            onPress={this.handleLetterPress}
            guessedLetters={this.state.currentGame.guessedLetters}
            failedLetters={this.state.currentGame.failedLetters}
            gameStatus={this.state.currentGame.status}
            startNewGame={this.startNewGame}
          />
        </div>
      </div>
    );
  }
}

export default Game;
