import React from 'react';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import './Hearts.css';

function Hearts({ lives }) {
  const hearts = [];

  // For each live, display an heart icon
  for (let i = 0; i < lives; i++) {
    hearts.push(
      <CSSTransition classNames="fade" timeout={{ enter: 500, exit: 450 }} key={i}>
        <img className="heart" src="/heart.svg" alt="" />
      </CSSTransition>
    );
  }

  return (
    <div className="hearts-container">
      <h3 className="hearts-title">Lives</h3>
      <div>
        <TransitionGroup>{hearts}</TransitionGroup>
      </div>
    </div>
  );
}

export default Hearts;
