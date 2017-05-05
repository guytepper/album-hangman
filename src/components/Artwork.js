import React from 'react'

function Artwork (props) {
  // Reduce bluriness for each wrong guess
  let blur = props.lives * 10;
  
  if ( props.GAME_END ) {
    blur = 0;
  }

  const artworkStyle = {
    margin: '10px auto',
    width: '300px',
    height: '300px',
    backgroundColor: 'grey',
    filter: `blur(${blur}px)`,
    transition: 'filter .5s ease-in-out'
 };

  return (
     <img style={ artworkStyle } src={ props.img } alt=""/>
  );
}

export default Artwork;
