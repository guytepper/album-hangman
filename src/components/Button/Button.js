import React from 'react';
import './Button.css';

let btnTypeClassName = '';
export default function Button(props) {
  if (props.type) btnTypeClassName = `hangman-btn-${props.type}`;
  if (props.className) btnTypeClassName += ' ' + props.className;

  return (
    <button onClick={props.onClick} disabled={props.disabled} className={`hangman-btn ${btnTypeClassName}`}>
      <div className="button-wrapper">
        <span className="button-text-wrapper">{props.children}</span>
      </div>
    </button>
  );
}
