import React from 'react';
import './GuessedLetters.css';

function GuessedLetters({ letters }) {
  return (
    <div className="failed-guesses">
      <h3 className="failed-guesses__title">Failed Guesses</h3>
      <div className="failed-guesses__letters">
        {letters.map(letter => (
          <span key={letter} className="failed-gueeses__letter">
            {letter}
          </span>
        ))}
      </div>
    </div>
  );
}

export default GuessedLetters;
