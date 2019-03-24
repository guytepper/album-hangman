import React from 'react';
import ReactLoading from 'react-loading';
import './Button.css';

let btnTypeClassName = '';
export default function Button(props) {
  if (props.type) btnTypeClassName = `hangman-btn-${props.type}`;
  if (props.className) btnTypeClassName += ' ' + props.className;

  return (
    <button onClick={props.onClick} disabled={props.disabled} className={`hangman-btn ${btnTypeClassName}`}>
      <div className="button-wrapper">
        <span className="button-loading-wrapper">
          {props.loading && <ReactLoading type="spin" width={20} height={20} />}
        </span>
        <span className="button-text-wrapper">{props.children}</span>
      </div>
    </button>
  );
}
