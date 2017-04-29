import React from 'react'

const keyboardStyle = {

};

const ROW_ONE = 'abcdefghijklm'.split('')
const ROW_TWO = 'nopqrstuvwxyz'.split('')

function Button (props) {
  return (
    <button>{ props.letter }</button>
  )
}

function getKeyboardRow (row) {
  return (
    <div>
      {
        row.map(letter => {
          return <Button letter={letter} key={letter} />;
        })
      }      
    </div>
  )
}

function Keyboard (props) {

  return (
    <div className='keyboard'>
      <div>
        {
          [ROW_ONE, ROW_TWO].map(getKeyboardRow)        
        }
      </div>      
    </div>
  );
}

export default Keyboard;
