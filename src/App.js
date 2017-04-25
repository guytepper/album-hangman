import React, { Component } from 'react';
import './App.css';
import Word from './Word';
import { Game } from './Game';

class App extends Component {
  constructor () {
    super();
    this.state = {};
    this.updateHiddenWords = this.updateHiddenWords.bind(this);
  }
  updateHiddenWords (newHiddenWords) {
    this.setState({
      HIDDEN_WORDS: newHiddenWords
    })
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
    // Pass
    const gameObj = new Game(this.updateHiddenWords);
    this.setState(gameObj);
  }
}

export default App;
