import React from 'react'
import './Keyboard.css';

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('')

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
              className='keyboard-btn'>
        { letter }
      </button>
    )
  }

  render () {
    return (
      <div className='keyboard'>
          {
            letters.map(letter => this.getButton(letter))
          }
      </div>
    );
  }
}

export default Keyboard;
