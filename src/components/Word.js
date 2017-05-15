import React from 'react'

const wordStyle = {
  letterSpacing: '5px'
};


function Word({ hiddenLetters }) {
  return (
    <h1 style={ wordStyle }>
      { hiddenLetters }
    </h1>
  );
}

export default Word;
