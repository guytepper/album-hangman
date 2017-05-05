import React from 'react'

const heartsContainerStyle = {
  display: 'flex'
}

const heartStyle = {
  width: 25,
  height: 25,
  margin: '0 2.5px'
}

function Hearts ({ lives }) {
  let hearts = [];
  
  // For each live, display an heart icon
  for (let i = 0; i < lives; i++) { 
    hearts.push(<img className='heart' style={heartStyle} src='/heart.svg' key={i} alt='' />);
  }

  return (
    <div style={ heartsContainerStyle }>
      {
        hearts.map(heart => heart)
      }
    </div>);

}

export default Hearts;
