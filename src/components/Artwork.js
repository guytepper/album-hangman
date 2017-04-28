import React from 'react'

const artworkStyle = {
  margin: '10px auto',
  width: '300px',
  height: '300px',
  backgroundColor: 'grey',
  filter: 'blur(30px)'

};


function Artwork (props) {
  
  return (
     <img style={ artworkStyle } src='./Stadiumarcadium.jpg' />
  );
}

export default Artwork;
