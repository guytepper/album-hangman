import React from 'react';
import { splitArrayWords } from '../../utils';
import './Word.css';

function Word({ hiddenLetters }) {
  const wordsArr = splitArrayWords(hiddenLetters);

  const words = wordsArr.map(word => {
    return (
      <div className="word">
        {[...word].map(letter => (
          <div className="hidden-word-letter" key={letter}>
            <span>{letter === '_' ? '' : letter}</span>
          </div>
        ))}
      </div>
    );
  });

  return <div>{words}</div>;
}

export default Word;
