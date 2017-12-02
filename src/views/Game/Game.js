import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import './Game.css';
import '../../assets/buttons.css';

import Artwork from '../../components/Artwork';
import Word from '../../components/Word';
import GuessedLetters from '../../components/GuessedLetters';
import Keyboard from '../../components/Keyboard';
import Hearts from '../../components/Hearts';

function Game(props) {
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

export default Game;
