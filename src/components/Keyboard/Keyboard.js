import React from 'react';
import './Keyboard.css';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class Keyboard extends React.Component {
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
    return <div className="keyboard">{letters.map(letter => this.getButton(letter))}</div>;
  }
}

export default Keyboard;
