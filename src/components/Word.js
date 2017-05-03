import React from 'react'

const wordStyle = {
  letterSpacing: '5px'
};


function Word(props) {
  return (
    <h1 style={ wordStyle }>
      { props.hiddenLetters }
    </h1>
  );
}

export default Word;
