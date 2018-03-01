import React from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup'; // ES6
import './Hearts.css';

function Hearts({ lives }) {
  if (lives === 0) return null;

  const hearts = [];

  // For each live, display an heart icon
  for (let i = 0; i < lives; i++) {
    hearts.push(<img className="heart" src="/heart.svg" key={i} alt="" />);
  }

  return (
    <div className="hearts-container">
      <CSSTransitionGroup
        transitionName="fade"
        transitionEnterTimeout={500}
        transitionLeaveTimeout={450}
      >
        {hearts}
      </CSSTransitionGroup>
    </div>
  );
}

export default Hearts;