import React, { Component } from 'react';
import ReactGA from 'react-ga';
import Hangman from 'hangman-game-engine';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import LoadingComponent from '../Loading';
import ErrorComponent from '../Error';

import Artwork from '../../components/Artwork';
import Word from '../../components/Word';
import Keyboard from '../../components/Keyboard';
import GameHeader from '../../components/GameHeader';
import SettingsModal from '../../components/SettingsModal/SettingsModal';
import EndModal from '../../components/EndModal';

import { isAlphabetical } from '../../utils';
import withAlbumsData from '../../api/withAlbumData';
import './Game.css';

class Game extends Component {
  state = {
    currentGame: {},
    currentAlbum: {},
    displaySettings: false
  };

  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyboardPress);
    ReactGA.pageview('/game/');
  }

  componentWillUnmount() {
    // Remove event listener on page redirection
    window.removeEventListener('keydown', this.handleKeyboardPress);
  }

  componentDidUpdate(prevProps) {
    if (this.props.loading !== prevProps.loading) {
      this.setNewAlbum();
    }
  }

  async setNewAlbum() {
    const album = this.props.nextAlbum;
    const currentGame = new Hangman(album.name);
    this.setState({ currentGame });
    setTimeout(() => this.setState({ currentAlbum: album }), 425);
  }

  handleKeyboardPress = event => {
    const { key } = event;

    if (isAlphabetical(key) && this.isGameActive()) {
      this.handleLetterPress(key.toUpperCase());
    }

    // Allow starting a new game when the current game has ended and ENTER key has been pressed.
    if (key === 'Enter' && this.gameEnd()) {
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

  startNewGame = async () => {
    try {
      const { currentGame } = this.state;
      if (currentGame.status === 'LOST') {
        ReactGA.event({ category: 'Game Action', action: 'Round End', label: 'Lose' });
        await this.props.moveFirstAlbumToArrayEnd();
      } else if (currentGame.status === 'WON') {
        ReactGA.event({ category: 'Game Action', action: 'Round End', label: 'Win' });
        await this.props.moveAlbumToGuessedArray();
      }

      if (this.props.progress !== this.props.totalAlbums) {
        this.setNewAlbum();
        return true;
      }
      return false;
    } catch (error) {
      throw error;
    }
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
    let currentComponent = LoadingComponent;
    let componentKey = 1;

    const GameComponent = (
      <div className="game">
        {this.state.displaySettings && (
          <React.Fragment>
            <div className="overlay" />
            <SettingsModal resetGameProgress={this.resetGameProgress} setSettingsDisplay={this.setSettingsDisplay} />
          </React.Fragment>
        )}
        {this.props.progress === this.props.totalAlbums && (
          <React.Fragment>
            <div className="overlay" />
            <EndModal
              playAgain={async () => {
                await this.props.resetGuessedAlbums();
                this.setNewAlbum();
              }}
            />
          </React.Fragment>
        )}
        <GameHeader
          setSettingsDisplay={this.setSettingsDisplay}
          failedGuesses={this.state.currentGame.failedGuesses}
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

    if (this.props.error) {
      currentComponent = <ErrorComponent message={this.props.error} />;
      componentKey = 2;
    } else if (this.state.currentAlbum.name) {
      currentComponent = GameComponent;
      componentKey = 3;
    }

    return (
      <TransitionGroup>
        <CSSTransition key={componentKey} classNames="fade" timeout={300}>
          {currentComponent}
        </CSSTransition>
      </TransitionGroup>
    );
  }
}

export { Game };
export default withAlbumsData(Game);
