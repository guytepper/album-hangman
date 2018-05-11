import React from 'react';
import { generate as generateId } from 'shortid';
import { splitArrayWords } from '../../utils';
import './Word.css';

function Word({ hiddenLetters }) {
  const wordsArr = splitArrayWords(hiddenLetters);

  const words = wordsArr.map(word => {
    return (
      <div className="word">
        {[...word].map(letter => (
          <div className="hidden-word-letter" key={generateId()}>
            <span>{letter === '_' ? '' : letter}</span>
          </div>
        ))}
      </div>
    );
  });

  return <div>{words}</div>;
}

export default Word;
