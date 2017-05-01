import React from 'react'
import './Keyboard.css';

const LETTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

class Keyboard extends React.Component {
  constructor() {
    super()
    this.getButton = this.getButton.bind(this);
  }

  handlePress(letter) {
    this.props.onPress(letter);
  }

  getButton (letter) {
    return (
      <button key={letter}
              onClick={this.handlePress.bind(this, letter)}
              className='keyboard-btn' >
        { letter }
      </button>
    )
  }

  render () {
    return (
      <div className='keyboard'>
        <div>
          {
            LETTERS.map(letter => this.getButton(letter))
          }
        </div>
      </div>
    );
  }
}

export default Keyboard;
