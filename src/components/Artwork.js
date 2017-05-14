import React from 'react'

function Artwork ({ img, blurLevel, GAME_END }) {
  if (GAME_END) {
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
     <img style={ artworkStyle } src={ img } alt=""/>
  );
}

export default Artwork;
