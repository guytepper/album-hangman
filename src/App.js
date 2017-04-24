import React, { Component } from 'react';
import './Game.css';
import * as Utils from './Utils';
import Word from './Word';
import Logic from './Logic';

class App extends Component {
  constructor () {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <code>
          <pre>
            { JSON.stringify(this.state.HIDDEN_LETTERS_ARRAY, null, 4) }
          </pre>
        </code>
        <Word hiddenLetters={ this.state.HIDDEN_LETTERS_ARRAY } />
      </div>
    );
  }
  componentDidMount() {
    const gameObj = new Logic();
    console.log(gameObj);
    this.setState(gameObj);
    // window.addEventListener('keydown', keyboardPress);
  }
}

export default Game;
