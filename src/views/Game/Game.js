import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Hangman from 'hangman-game-engine';
import ReactLoading from 'react-loading';
import { TransitionGroup, CSSTransition } from 'react-transition-group';

import Artwork from '../../components/Artwork';
import Word from '../../components/Word';
import Button from '../../components/Button';

import Keyboard from '../../components/Keyboard';
import GameHeader from '../../components/GameHeader';
import SettingsModal from '../../components/SettingsModal';

import { isKeyCodeAlphabetical } from '../../utils';
import withAlbumsData from '../../api/albumData';
import './Game.css';

class Game extends Component {
  state = {
    error: null,
    currentGame: new Hangman(this.props.nextAlbum.name),
    currentAlbum: this.props.nextAlbum,
    displaySettings: false
  };

  componentDidMount() {
    console.log('hi?');
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
    const album = this.props.nextAlbum;
    console.log(this.props.nextAlbum);
    const currentGame = new Hangman(album.name);
    this.setState({ currentGame });
    setTimeout(() => this.setState({ currentAlbum: album }), 425);
  }

  handleKeyboardPress = event => {
    const keyCode = event.which;
    console.log(this.isGameActive());

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
    const { currentGame } = this.state;
    if (currentGame.status === 'LOST') {
      this.props.moveFirstAlbumToEnd();
    } else if (currentGame.status === 'WON') {
      this.props.moveAlbumToGuessedArray();
    }

    this.setNewAlbum();
  };

  setSettingsDisplay = displaySettings => {
    this.setState({ displaySettings });
  };

  resetGameProgress = () => {
    if (window.confirm('Are you sure you want to reset your progress?')) {
      this.props.resetGuessedAlbums();
      alert('Your progress has been deleted.');
      this.setState({ displaySettings: false });
    }
  };

  isGameActive = () => {
    return this.state.currentGame.status === 'IN_PROGRESS';
  };

  gameEnd = () => {
    return this.state.currentGame.status !== 'IN_PROGRESS';
  };

  render() {
    let currentComponent = null;
    let componentKey = 0;

    const ErrorComponent = (
      <div className="error-container">
        <h1>{this.state.error}</h1>
        <Link to="/">
          <Button type="warning">Try again?</Button>
        </Link>
      </div>
    );

    const LoadingComponent = (
      <div className="loading-state">
        <ReactLoading type="bubbles" color="black" height={150} width={150} />
        <h1 style={{ marginTop: 0 }}>Loading...</h1>
      </div>
    );

    const GameComponent = (
      <div className="game">
        {this.state.displaySettings && (
          <CSSTransition classNames="fade" timeout={300}>
            <React.Fragment>
              <div className="overlay" />
              <SettingsModal
                className="settings-overlay"
                setSettingsDisplay={this.setSettingsDisplay}
                resetProgress={this.resetGameProgress}
              />
            </React.Fragment>
          </CSSTransition>
        )}
        <GameHeader
          setSettingsDisplay={this.setSettingsDisplay}
          currentGame={this.state.currentGame}
          totalAlbums={this.props.totalAlbums}
          albumsProgress={this.props.progress}
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
    console.log(this.state.currentAlbum === {});
    if (this.state.error) {
      currentComponent = ErrorComponent;
      componentKey = 1;
    } else if (this.state.currentAlbum.name === undefined) {
      currentComponent = LoadingComponent;
      componentKey = 2;
    } else {
      console.log('123');
      currentComponent = GameComponent;
      componentKey = 3;
    }

    // MOVE TRANSITION GROUP TO ALBUM DATA ?
    return (
      <TransitionGroup>
        <CSSTransition key={componentKey} classNames="fade" timeout={300}>
          {currentComponent}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export default withAlbumsData(Game);
