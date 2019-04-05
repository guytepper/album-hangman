import React from 'react';
import classNames from 'classnames';
import './Button.css';

export default function Button(props) {
  const classes = classNames('hangman-btn', { [`hangman-btn-${props.type}`]: props.type }, props.className);

  return (
    <button onClick={props.onClick} disabled={props.disabled} className={classes}>
      <div className="button-wrapper">
        <span className="button-text-wrapper">{props.children}</span>
      </div>
    </button>
  );
}
