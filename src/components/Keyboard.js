import React from 'react'

const keyboardStyle = {

};

const ROW_ONE = 'ABCDEFGHIJKLM'.split('')
const ROW_TWO = 'NOPQRSTUVWXYZ'.split('')

class Keyboard extends React.Component {
  constructor() {
    super()
    // this.handlePress = this.handlePress.bind(this);
    this.getButton = this.getButton.bind(this);
    this.getKeyboardRow = this.getKeyboardRow.bind(this);
  }

  handlePress(letter) {
    this.props.onPress(letter);
  }

  getButton (letter) {
    return (
      <button key={letter} onClick={ this.handlePress.bind(this, letter) } >
        { letter }
      </button>
    )
  }

  getKeyboardRow (row) {
    return (
      <div key={row}>
        {
          row.map(letter => {
            return this.getButton(letter)
          })
        }      
      </div>
    )
  }

  render () {
    return (
      <div className='keyboard'>
        <div>
          {
            [ROW_ONE, ROW_TWO].map(this.getKeyboardRow)   
          }
        </div>
      </div>
    );
  }
}

export default Keyboard;
