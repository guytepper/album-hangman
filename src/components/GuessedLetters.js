import React from 'react'

const letterStyle = {
  letterSpacing: '3px',
};


function GuessedLetters(props) {
  return (
    <div>
      <h3>Guessed Letters: { 
        props.letters.map(letter => {
          return <span style={ letterStyle }>{ letter }</span>
        })
      }</h3>
      
    </div>
  );
}

export default GuessedLetters;
