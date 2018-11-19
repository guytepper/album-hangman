import React from 'react';
import './Artwork.css';

function Artwork({ img, blurLevel, gameEnd }) {
  if (gameEnd) {
    blurLevel = 0;
  }

  // Make the last guess a bit harder
  if (blurLevel === 5) {
    blurLevel = 8;
  }

  return (
    <div className="album-artwork-container">
      <img className="album-artwork" style={{ filter: `blur(${blurLevel}px)` }} src={img} alt="" draggable={false} />
    </div>
  );
}

export default Artwork;
