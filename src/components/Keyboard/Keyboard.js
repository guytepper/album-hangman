import React from 'react';
import './Keyboard.css';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');

class Keyboard extends React.Component {
  constructor() {
    super();
    this.getButton = this.getButton.bind(this);
    this.handlePress = this.handlePress.bind(this);
  }

  getButton(letter) {
    return (
      <button key={letter} onClick={() => this.handlePress(letter)} className="keyboard-btn">
        {letter}
      </button>
    );
  }

  handlePress(letter) {
    this.props.onPress(letter);
  }

  render() {
    return <div className="keyboard">{letters.map(letter => this.getButton(letter))}</div>;
  }
}

export default Keyboard;
