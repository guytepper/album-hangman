import React from 'react';

function Artwork({ img, blurLevel, gameEnd, hidden }) {
  if (gameEnd) {
    blurLevel = 0;
  }

  const artworkStyle = {
    margin: '10px auto',
    width: '250px',
    height: '250px',
    backgroundColor: 'grey',
    filter: `blur(${blurLevel}px)`,
    transition: 'filter .5s ease-in-out'
  };

  return (
    <img
      style={hidden ? { display: 'none' } : artworkStyle}
      src={img}
      alt=''
    />
  );
}

export default Artwork;
