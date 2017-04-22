import React, { Component } from 'react';
import './Game.css';
import * as Utils from './Utils';

/**
 * ......
 */
function initGame() {
  const ALBUM_NAME = 'Stadium Arcadium';
  const ALBUM_NAME_ARR = [...ALBUM_NAME];
  const HIDDEN_LETTERS_ARRAY = Utils.createUnderscoresArr(ALBUM_NAME_ARR);

  return {
    ALBUM_NAME,
    ALBUM_NAME_ARR,
    HIDDEN_LETTERS_ARRAY
  }
}

class Game extends Component {
  constructor () {
    super();
    this.state = {};
  }
  render() {
    return (
      <div>
        <code><pre>{ JSON.stringify(this.state.HIDDEN_LETTERS_ARRAY, null, 4) }</pre></code>
      </div>
    );
  }
  componentDidMount() {
    const gameObj = initGame();
    this.setState(gameObj);
  }
}

export default Game;
