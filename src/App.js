import React, { Component } from 'react';
import './App.css';
import Word from './Word';
import { Game } from './Game';

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
    const gameObj = new Game();
    console.log(gameObj);
    this.setState(gameObj);
    // window.addEventListener('keydown', keyboardPress);
  }
}

export default App;
