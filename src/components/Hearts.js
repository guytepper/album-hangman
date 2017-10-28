import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // ES6
import './Hearts.css';

const heartsContainerStyle = {
  display: 'flex',
  height: 25
};

const heartStyle = {
  width: 25,
  height: 25,
  margin: '0 2.5px'
};

function Hearts({ lives }) {
  if (lives === 0) return null;

  const hearts = [];

  // For each live, display an heart icon
  for (let i = 0; i < lives; i++) {
    hearts.push(<img className="heart" style={heartStyle} src="/heart.svg" key={i} alt="" />);
  }

  return (
    <div style={heartsContainerStyle}>
      <CSSTransitionGroup transitionName="fade" transitionEnterTimeout={500} transitionLeaveTimeout={450}>
        {hearts}
      </CSSTransitionGroup>
    </div>
  );
}

export default Hearts;
