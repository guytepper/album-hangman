import React from 'react';
import Button from '../Button';
import './Keyboard.css';

const rowA = 'QWERTYUIOP'.split('');
const rowB = 'ASDFGHJKL'.split('');
const rowC = 'ZXCVBNM'.split('');

function playAgainBtn(startNewGame) {
  return (
    <Button onClick={startNewGame} type="success">
      Next Album →
    </Button>
  );
}

function gameEndMessage(gameStatus) {
  if (gameStatus === 'WON') {
    return (
      <h1 className="game-status-msg">
        Correct!{' '}
        <span role="img" aria-label="Party Popper">
          🎉
        </span>
      </h1>
    );
  }

  if (gameStatus === 'LOST') {
    return (
      <h1 className="game-status-msg">
        Failed{' '}
        <span role="img" aria-label="Sneezing">
          🤧
        </span>
      </h1>
    );
  }

  return null;
}

class Keyboard extends React.PureComponent {
  getButton = letter => {
    return (
      <button key={letter} onClick={() => this.handlePress(letter)} className="keyboard-btn">
        <span
          className={[
            'keyboard-btn-letter',
            this.props.failedLetters.includes(letter)
              ? 'keyboard-btn-fail'
              : this.props.guessedLetters.includes(letter)
              ? 'keyboard-btn-success'
              : null
          ].join(' ')}
        >
          {letter}
        </span>
      </button>
    );
  };

  handlePress = letter => {
    this.props.onPress(letter);
  };

  render() {
    return (
      <div className="keyboard-container">
        {this.props.gameStatus !== 'IN_PROGRESS' && (
          <div className="game-end-message">
            {gameEndMessage(this.props.gameStatus)}
            {playAgainBtn(this.props.startNewGame)}
          </div>
        )}
        <div className="keyboard">
          <div>{rowA.map(letter => this.getButton(letter))}</div>
          <div>{rowB.map(letter => this.getButton(letter))}</div>
          <div>{rowC.map(letter => this.getButton(letter))}</div>
        </div>
      </div>
    );
  }
}

export default Keyboard;
