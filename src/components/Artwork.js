import React from 'react'

function Artwork ({ lives, GAME_END, img }) {
  // Reduce bluriness for each wrong guess
  let blur = lives * 10;
  
  if ( GAME_END ) {
    blur = 0;
  }

  const artworkStyle = {
    margin: '10px auto',
    width: '250px',
    height: '250px',
    backgroundColor: 'grey',
    filter: `blur(${blur}px)`,
    transition: 'filter .5s ease-in-out'
 };

  return (
     <img style={ artworkStyle } src={ img } alt=""/>
  );
}

export default Artwork;
