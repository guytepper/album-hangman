import React from 'react'

const letterStyle = {
  letterSpacing: '3px',
};


function GuessedLetters({ letters }) {
  return (
    <div>
      <h3>
        Guessed Letters:&nbsp;
        {
          letters.map(letter => {
            return <span key={ letter } style={ letterStyle } className="guessed-letter">{ letter }</span>
          })
        }
      </h3>      
    </div>
  );
}

export default GuessedLetters;
