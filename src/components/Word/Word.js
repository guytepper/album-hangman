import React from 'react';
import { generate as generateId } from 'shortid';
import { splitArrayWords } from '../../utils';
import './Word.css';

function Word({ hiddenLetters }) {
  const wordsArr = splitArrayWords(hiddenLetters);

  const words = wordsArr.map(word => {
    return (
      <div className="hidden-word" key={generateId()}>
        {[...word].map(letter => (
          <div className="hidden-word-letter" key={generateId()}>
            <span>{letter === '_' ? '' : letter}</span>
          </div>
        ))}
      </div>
    );
  });

  return <div className="hidden-album-name">{words}</div>;
}

export default Word;
